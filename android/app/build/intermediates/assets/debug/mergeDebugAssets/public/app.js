import { LocalNotifications } from '@capacitor/local-notifications';
import { Share } from '@capacitor/share';
import { Battery } from '@capacitor/battery';

// 1. Hiển thị thông báo đếm ngược sinh nhật
async function scheduleNotification(daysLeft) {
  await LocalNotifications.schedule({
    notifications: [
      {
        title: '🎂 Đếm ngược sinh nhật!',
        body: `Còn ${daysLeft} ngày nữa là đến sinh nhật của bạn! 🥳`,
        id: 1,
        schedule: { at: new Date(new Date().getTime() + 5000) },
      },
    ],
  });
}

// 2. Chia sẻ kết quả đếm ngược
async function shareCountdown(daysLeft) {
  await Share.share({
    title: '🎉 Đếm ngược sinh nhật!',
    text: `Còn ${daysLeft} ngày nữa là đến sinh nhật của tôi! 🎂`,
    url: window.location.href,
    dialogTitle: 'Chia sẻ với bạn bè',
  });
}

// 3. Hiển thị trạng thái pin
document.getElementById('battery-btn').addEventListener('click', async () => {
  try {
    const status = await Battery.getStatus();
    document.getElementById('battery-status').innerText =
      `🔋 Pin: ${Math.round(status.batteryLevel * 100)}% - ${status.isCharging ? 'Đang sạc' : 'Không sạc'}`;
  } catch (error) {
    document.getElementById('battery-status').innerText = '⚠ Không thể lấy trạng thái pin';
    console.error("Lỗi khi lấy trạng thái pin:", error);
  }
});


// Gọi các hàm sau khi tính toán số ngày
function handleBirthdayCountdown(daysLeft) {
  scheduleNotification(daysLeft);
  document.getElementById('share-btn').addEventListener('click', () => shareCountdown(daysLeft));
  checkBatteryStatus();
}
import { Share } from '@capacitor/share';
import { Battery } from '@capacitor/battery';

// 1. Chia sẻ kết quả
async function shareCountdown(daysLeft) {
  await Share.share({
    title: '🎉 Đếm ngược sinh nhật!',
    text: `Còn ${daysLeft} ngày nữa là đến sinh nhật của tôi! 🎂`,
    dialogTitle: 'Chia sẻ với bạn bè',
  });
}

// 2. Hiển thị trạng thái pin
async function checkBatteryStatus() {
  const status = await Battery.getStatus();
  document.getElementById('battery-status').innerText = `🔋 Pin: ${status.batteryLevel * 100}% - ${status.isCharging ? 'Đang sạc' : 'Không sạc'}`;
}

// Gọi các hàm sau khi tính toán số ngày
function handleBirthdayCountdown(daysLeft) {
  document.getElementById('share-btn').addEventListener('click', () => shareCountdown(daysLeft));
  checkBatteryStatus();
}
