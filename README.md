# 💻 FRONTEND_READ_FILE (React + Vite + Tailwind)

> Ứng dụng React giao diện frontend dùng để upload file Word (.docx) và hiển thị thông tin vé máy bay đọc được từ API backend (.NET 8).

---

## 🚀 Mục lục

- [Giới thiệu](#-giới-thiệu)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Cách chạy dự án](#️-cách-chạy-dự-án)
- [Cấu hình kết nối API](#-cấu-hình-kết-nối-api)
- [Luồng hoạt động](#-luồng-hoạt-động)
- [Ảnh minh họa giao diện](#-ảnh-minh-họa-giao-diện)
- [Tác giả](#-tác-giả)

---

## 📖 Giới thiệu

Frontend của dự án **READ_FILE** cho phép người dùng:

- Upload file `.docx` (vé máy bay, xác nhận booking).
- Gửi file đến API backend (.NET 8) qua endpoint `/api/parse/upload`.
- Hiển thị kết quả trích xuất thông tin: họ, tên, mã đặt chỗ

---

## 🧠 Công nghệ sử dụng

| Thành phần                            | Phiên bản / Mục đích                 |
| ------------------------------------- | ------------------------------------ |
| **React + Vite**                      | Khởi tạo và build ứng dụng nhanh     |
| **TypeScript**                        | Giúp code an toàn và rõ ràng         |
| **TailwindCSS**                       | Thiết kế giao diện gọn nhẹ, hiện đại |
| **React Hooks (useState, useEffect)** | Quản lý trạng thái form upload       |

---

## ⚙️ Cách chạy dự án

### 1️⃣ Cài đặt dependencies

```bash
npm install
```

### 2️⃣ Chạy ứng dụng ở môi trường dev

```bash
npm run dev
```

Ứng dụng mặc định chạy tại:
👉 [http://localhost:3000](http://localhost:3000)

## 🌐 Cấu hình kết nối API

Trong file `App.tsx`:

```typescript
const resp = await fetch("https://localhost:7053/api/Parse/upload", {
  method: "POST",
  body: fd,
});
```

> ⚠️ Nếu backend chạy ở port khác, hãy sửa lại URL tương ứng.

Nếu bạn chạy React bằng port **5173 (Vite)**, hãy chắc chắn backend có bật **CORS**:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
app.UseCors("AllowFrontend");
```

---

## 🔄 Luồng hoạt động

1. Người dùng chọn file `.docx` → nhấn **Upload**.
2. React gửi file qua `POST /api/Parse/upload`.
3. Backend đọc file Word, phân tích dữ liệu bằng OpenXML.
4. Kết quả trả về JSON chứa thông tin vé.
5. Frontend hiển thị chi tiết vé + hành khách + chuyến bay.

---

## 🧩 Ví dụ cấu trúc dữ liệu trả về

```json
{
  "fileName": "VeVJ1.docx",
  "bookingCode": "SVE22W",
  "contactPhone": "0909641857",
  "contactEmail": "quipq.fit@vietravel.com",
  "bookingDate": "17/05/2022",
  "bookerName": "BUI, HUYEN THANH",
  "passengers": [
    {
      "firstName": "HUYEN THANH",
      "lastName": "BUI"
    },
    {
      "firstName": "THE TOAN",
      "lastName": "TRAN"
    },
    {
      "firstName": "DUC LONG BIEN",
      "lastName": "KHONG"
    }
  ],
  "flights": [
    {
      "flightNumber": "VJ864",
      "date": "21/09/2022",
      "fareClass": "Eco",
      "departureTimeAndPlace": "22:40 - Ho Chi Minh (SGN)",
      "arrivalTimeAndPlace": "05:45 - Seoul (ICN)"
    },
    {
      "flightNumber": "VJ863",
      "date": "25/09/2022",
      "fareClass": "Eco",
      "departureTimeAndPlace": "11:40 - Seoul (ICN)",
      "arrivalTimeAndPlace": "14:55 - Ho Chi Minh (SGN)"
    }
  ]
}
```

---

## 👤 Tác giả

**Nguyễn Tấn Hữu Danh**  
💼 _Frontend Developer_  
📧 *your.nguyentanhuudanh@gmail.com*  
🌐 _GitHub:_ [github.com/Huu-Danh](https://github.com/Huu-Danh)
