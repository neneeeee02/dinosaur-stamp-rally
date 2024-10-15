// パーツの進捗を追跡するデータ構造
let partsCollected = {
    head: false,
    arms: false,
    torso: false,
    legs: false,
    tail: false
};

// 画面の表示を更新する関数
function updateProgress() {
    document.getElementById('head').textContent = partsCollected.head ? "収集済み" : "未収集";
    document.getElementById('arms').textContent = partsCollected.arms ? "収集済み" : "未収集";
    document.getElementById('torso').textContent = partsCollected.torso ? "収集済み" : "未収集";
    document.getElementById('legs').textContent = partsCollected.legs ? "収集済み" : "未収集";
    document.getElementById('tail').textContent = partsCollected.tail ? "収集済み" : "未収集";
}

// QRコードの読み取りをシミュレートする（実際にはQRコードから取得したデータを使用）
function scanPart(part) {
    if (partsCollected[part] !== undefined) {
        partsCollected[part] = true;
        updateProgress();
    }
}

// 例: 「頭」のQRコードを読み取った場合
scanPart('head');  // 頭のQRコードを読み取った後

const html5QrCode = new Html5Qrcode("reader");

// QRコードを読み取る関数
function startScanner() {
    html5QrCode.start(
        { facingMode: "environment" }, // 背面カメラを使用
        {
            fps: 10,    // フレームレート
            qrbox: { width: 250, height: 250 } // QRボックスのサイズ
        },
        (decodedText, decodedResult) => {
            // QRコードが読み取られたときの処理
            scanPart(decodedText); // ここで、スキャンしたパーツの関数を呼び出す
        },
        (errorMessage) => {
            // QRコードが見つからなかった場合の処理
            console.log(errorMessage);
        }
    ).catch(err => {
        // スキャンエラー
        console.error(err);
    });
}

// ページがロードされたときにスキャナーをスタート
window.onload = () => {
    startScanner();
};
