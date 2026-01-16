# Bluebirds Homestay - Web Application

A premium, dynamic web application for managing Bluebirds Homestay. Featuring real-time Google Sheets synchronization, an integrated admin dashboard, and a seamless booking experience.

## 🚀 How to Run the Web App

> [!IMPORTANT]
> To enable **Google Sheets Synchronization**, you MUST run this application through a local web server (to bypass browser CORS security).

### Method 1: Python (Recommended)
1. Open your terminal/command prompt.
2. Navigate to the project folder.
3. Run the following command:
   ```bash
   python3 -m http.server 8000
   ```
4. Open your browser and go to: [http://localhost:8000](http://localhost:8000)

### Method 2: Node.js (npx)
1. In the project terminal, run:
   ```bash
   npx serve .
   ```
2. Open your browser and go to: [http://localhost:5000](http://localhost:5000)

---

## 🛠 Features

### 1. Google Sheets Integration
The website is synced with a Google Sheet for real-time inventory management.
- **Auto-Sync:** Data refreshes every time the page is loaded.
- **Configuration:** Managed via the Admin Dashboard.
- **Default Sheet:** Already pre-configured for your convenience.

### 2. Admin Portal
Manage your property details directly through the dashboard.
- **URL:** [http://localhost:8000/admin.html](http://localhost:8000/admin.html)
- **Credentials:**
  - **Username:** `jephyn`
  - **Password:** `mattio@24`

### 3. Dynamic Room Grid
- Real-time price and availability updates.
- Premium gallery modal with multi-category images.
- Google Drive image support (auto-converts share links).

### 4. Integrated Booking
- Automated booking requests sent via background submission.
- Instant success feedback for guests.

---

## 📂 Project Structure

- `index.html`: Homepage & Hero section.
- `rooms.html`: Dynamic room listings.
- `admin-dashboard.html`: Data management interface.
- `rooms-data.js`: Core data logic & Google Sheets sync.
- `script.js`: Interactive UI features & animations.
- `styles.css`: Premium design system.

---

## 📝 Troubleshooting

**"Refreshing latest room details..." hangs forever?**
This happens if you open `index.html` as a file (`file://`). Please use the **Python/Node server** methods described above to allow data fetching.

**Changes in Google Sheet not reflecting?**
1. Check if the sheet is "Published to web" as a **CSV**.
2. Refresh the website page.
3. Ensure you are running on `http://localhost:8000`.
