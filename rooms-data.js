/**
 * Bluebirds Homestay - Room Data Management System
 * Handles localStorage persistence and dynamic content
 */

const DEFAULT_ROOMS = {
    '101': {
        name: 'Deluxe Room 101',
        size: '14 × 16 ft',
        bedSize: '6 × 7 ft',
        price: '2000',
        images: [
            { src: '/Users/jobin/.gemini/antigravity/brain/01aaeb87-cc2f-44f6-ad2e-d0b18e64bc98/room_101_main_1768541653997.png', category: 'Room View' },
            { src: 'placeholder-window.jpg', category: 'Window View' },
            { src: 'placeholder-frontage.jpg', category: 'Room Frontage' },
            { src: 'placeholder-bathroom.jpg', category: 'Bathroom' }
        ],
        amenities: ['Air Conditioning', 'King Size Bed', 'Private Bathroom', 'Hot Water', '64" Smart TV', 'Music System']
    },
    '102': {
        name: 'Deluxe Room 102',
        size: '14 × 16 ft',
        bedSize: '6 × 7 ft',
        price: '2000',
        images: [
            { src: '/Users/jobin/.gemini/antigravity/brain/01aaeb87-cc2f-44f6-ad2e-d0b18e64bc98/room_102_main_1768541671794.png', category: 'Room View' },
            { src: 'placeholder-window.jpg', category: 'Window View' },
            { src: 'placeholder-frontage.jpg', category: 'Room Frontage' },
            { src: 'placeholder-bathroom.jpg', category: 'Bathroom' }
        ],
        amenities: ['Air Conditioning', 'King Size Bed', 'Private Bathroom', 'Hot Water', '64" Smart TV', 'Music System']
    },
    '103': {
        name: 'Deluxe Room 103',
        size: '14 × 16 ft',
        bedSize: '6 × 7 ft',
        price: '2000',
        images: [
            { src: '/Users/jobin/.gemini/antigravity/brain/01aaeb87-cc2f-44f6-ad2e-d0b18e64bc98/room_103_main_1768541691301.png', category: 'Room View' },
            { src: 'placeholder-window.jpg', category: 'Window View' },
            { src: 'placeholder-frontage.jpg', category: 'Room Frontage' },
            { src: 'placeholder-bathroom.jpg', category: 'Bathroom' }
        ],
        amenities: ['Air Conditioning', 'King Size Bed', 'Private Bathroom', 'Hot Water', '64" Smart TV', 'Music System']
    },
    '104': {
        name: 'Deluxe Room 104',
        size: '14 × 16 ft',
        bedSize: '6 × 7 ft',
        price: '2000',
        images: [
            { src: '/Users/jobin/.gemini/antigravity/brain/01aaeb87-cc2f-44f6-ad2e-d0b18e64bc98/room_104_main_1768541709309.png', category: 'Room View' },
            { src: 'placeholder-window.jpg', category: 'Window View' },
            { src: 'placeholder-frontage.jpg', category: 'Room Frontage' },
            { src: 'placeholder-bathroom.jpg', category: 'Bathroom' }
        ],
        amenities: ['Air Conditioning', 'King Size Bed', 'Private Bathroom', 'Hot Water', '64" Smart TV', 'Music System']
    },
    '106': {
        name: 'Deluxe Room 106',
        size: '14 × 16 ft',
        bedSize: '6 × 7 ft',
        price: '2000',
        images: [
            { src: '/Users/jobin/.gemini/antigravity/brain/01aaeb87-cc2f-44f6-ad2e-d0b18e64bc98/room_106_main_1768541726497.png', category: 'Room View' },
            { src: 'placeholder-window.jpg', category: 'Window View' },
            { src: 'placeholder-frontage.jpg', category: 'Room Frontage' },
            { src: 'placeholder-bathroom.jpg', category: 'Bathroom' }
        ],
        amenities: ['Air Conditioning', 'King Size Bed', 'Private Bathroom', 'Hot Water', '64" Smart TV', 'Music System']
    },
    '107': {
        name: 'Deluxe Room 107',
        size: '14 × 16 ft',
        bedSize: '6 × 7 ft',
        price: '2000',
        images: [
            { src: '/Users/jobin/.gemini/antigravity/brain/01aaeb87-cc2f-44f6-ad2e-d0b18e64bc98/room_107_main_1768541743971.png', category: 'Room View' },
            { src: 'placeholder-window.jpg', category: 'Window View' },
            { src: 'placeholder-frontage.jpg', category: 'Room Frontage' },
            { src: 'placeholder-bathroom.jpg', category: 'Bathroom' }
        ],
        amenities: ['Air Conditioning', 'King Size Bed', 'Private Bathroom', 'Hot Water', '64" Smart TV', 'Music System']
    },
    '108': {
        name: 'Room 108 - Dormitory',
        size: '20 × 24 ft',
        bedSize: '3 × 6 ft (each)',
        price: '2000',
        images: [
            { src: 'placeholder-dormitory.jpg', category: 'Dormitory View' },
            { src: 'placeholder-window.jpg', category: 'Window View' },
            { src: 'placeholder-frontage.jpg', category: 'Room Frontage' },
            { src: 'placeholder-bathroom.jpg', category: 'Shared Bathroom' }
        ],
        amenities: ['Air Conditioning', 'Multiple Beds', 'Shared Bathroom', 'Hot Water', '64" Smart TV', 'Music System']
    }
};

const DEFAULT_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1lR9D4qdyieDuBF96fk-aL1rmDpQUzTfTx2zPxFPK4kQ/export?format=csv';

class RoomManager {
    constructor() {
        this.storageKey = 'bluebirds_rooms';
        this.configKey = 'bluebirds_config';
        this.init();
    }

    async init() {
        if (!localStorage.getItem(this.configKey)) {
            localStorage.setItem(this.configKey, JSON.stringify({ 
                sheetUrl: DEFAULT_SHEET_URL, 
                lastSync: null 
            }));
        }

        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify(DEFAULT_ROOMS));
        }

        // Always sync on load if a sheet URL is configured
        const config = this.getConfig();
        if (config.sheetUrl) {
            console.log('Refreshing data from Google Sheet...');
            return await this.syncWithSheet();
        }
        return { success: true };
    }

    getAllRooms() {
        return JSON.parse(localStorage.getItem(this.storageKey));
    }

    getConfig() {
        return JSON.parse(localStorage.getItem(this.configKey));
    }

    updateConfig(newConfig) {
        const config = this.getConfig();
        const updated = { ...config, ...newConfig };
        localStorage.setItem(this.configKey, JSON.stringify(updated));
    }

    updateRoom(id, data) {
        const rooms = this.getAllRooms();
        rooms[id] = { ...rooms[id], ...data };
        localStorage.setItem(this.storageKey, JSON.stringify(rooms));
        return true;
    }

    async syncWithSheet() {
        const config = this.getConfig();
        if (!config.sheetUrl) return { success: false, message: 'No Google Sheet URL provided' };

        // Controller for fetch timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

        try {
            const response = await fetch(config.sheetUrl, { signal: controller.signal });
            clearTimeout(timeoutId);
            
            const csvText = await response.text();
            const rooms = this.parseCSV(csvText);
            
            if (Object.keys(rooms).length > 0) {
                localStorage.setItem(this.storageKey, JSON.stringify(rooms));
                this.updateConfig({ lastSync: new Date().toISOString() });
                return { success: true, message: 'Sync successful!' };
            }
            return { success: false, message: 'No valid data found in sheet. Check your column headers.' };
        } catch (error) {
            clearTimeout(timeoutId);
            console.error('Sync failed:', error);
            
            if (error.name === 'AbortError') {
                return { success: false, message: 'Sync timed out. Check your internet connection.' };
            }

            // Detection for CORS blocks (common when running from file://)
            if (window.location.protocol === 'file:') {
                return { 
                    success: false, 
                    message: 'CORS Blocked: Google Sheets sync only works when running on a local server (e.g., http://localhost:8000). Please check implementation_plan.md for instructions.' 
                };
            }

            return { success: false, message: 'Fetch failed. Ensure your spreadsheet is "Published to web" as CSV.' };
        }
    }

    parseCSV(csvText) {
        // Handle various newline formats and filter empty lines
        const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '');
        if (lines.length < 2) return {};

        // Helper to find column index regardless of case/whitespace
        const findColumn = (headers, names) => {
            const searchNames = names.map(n => n.toLowerCase());
            return headers.findIndex(h => searchNames.includes(h.trim().toLowerCase()));
        };

        const headers = lines[0].split(',').map(h => h.trim());
        const rooms = {};

        // Find critical column indices
        const idx = {
            id: findColumn(headers, ['ID', 'Room ID', 'RoomID']),
            name: findColumn(headers, ['Name', 'Room Name', 'RoomName']),
            size: findColumn(headers, ['Size', 'Room Size', 'Dimensions']),
            bed: findColumn(headers, ['BedSize', 'Bed Size', 'Bed']),
            price: findColumn(headers, ['Price', 'Rate', 'Room Rate']),
            imgMain: findColumn(headers, ['MainImage', 'Image 1', 'Main Image']),
            imgWindow: findColumn(headers, ['WindowImage', 'Image 2', 'Window Image']),
            amenities: findColumn(headers, ['Amenities', 'Features', 'Facility'])
        };

        // If we can't find ID or Name, we can't reliably parse
        if (idx.id === -1 || idx.name === -1) {
            console.warn('CSV parsing failed: Could not find ID or Name columns.', headers);
            return {};
        }

        for (let i = 1; i < lines.length; i++) {
            // Robust CSV splitting (handles quoted values with commas)
            const values = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || lines[i].split(',');
            const getVal = (idx) => (idx !== -1 && values[idx]) ? values[idx].replace(/^"|"$/g, '').trim() : '';

            const roomId = getVal(idx.id);
            if (roomId) {
                rooms[roomId] = {
                    name: getVal(idx.name) || `Room ${roomId}`,
                    size: getVal(idx.size) || 'N/A',
                    bedSize: getVal(idx.bed) || 'N/A',
                    price: getVal(idx.price) || '0',
                    images: [
                        { src: RoomManager.convertGDriveLink(getVal(idx.imgMain)), category: 'Room View' },
                        { src: RoomManager.convertGDriveLink(getVal(idx.imgWindow)), category: 'Window View' }
                    ],
                    amenities: getVal(idx.amenities) ? getVal(idx.amenities).split(/[|;,]/).map(a => a.trim()) : []
                };
            }
        }
        return rooms;
    }

    /**
     * Converts a Google Drive share link to a direct download link
     */
    static convertGDriveLink(url) {
        if (!url || url === 'N/A') return '';
        const driveRegex = /https:\/\/drive\.google\.com\/file\/d\/([^\/]+)\//;
        const match = url.match(driveRegex);
        if (match && match[1]) {
            return `https://lh3.googleusercontent.com/u/0/d/${match[1]}=w1000`;
        }
        return url;
    }
}

const roomManager = new RoomManager();
