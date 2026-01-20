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
        console.group('RoomManager Initialization');
        if (!localStorage.getItem(this.configKey)) {
            localStorage.setItem(this.configKey, JSON.stringify({
                sheetUrl: DEFAULT_SHEET_URL,
                lastSync: null
            }));
        }

        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify(DEFAULT_ROOMS));
        } else {
            // Aggressive Migration: Ensure ALL rooms have size/bedSize
            const rooms = this.getAllRooms();
            let changed = false;
            Object.keys(rooms).forEach(id => {
                const defaultRoom = DEFAULT_ROOMS[id] || Object.values(DEFAULT_ROOMS)[0];
                if (!rooms[id].size || rooms[id].size.trim() === '' || !/\d/.test(rooms[id].size)) {
                    rooms[id].size = defaultRoom.size; changed = true;
                }
                if (!rooms[id].bedSize || rooms[id].bedSize.trim() === '' || !/\d/.test(rooms[id].bedSize)) {
                    rooms[id].bedSize = defaultRoom.bedSize; changed = true;
                }
            });
            if (changed) {
                console.log('Fixed room data in localStorage.');
                localStorage.setItem(this.storageKey, JSON.stringify(rooms));
            }
        }

        const config = this.getConfig();
        if (config.sheetUrl) {
            console.log('Syncing starting...');
            const result = await this.syncWithSheet();
            console.log('Sync result:', result);
            console.groupEnd();
            return result;
        }
        console.groupEnd();
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

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        try {
            const response = await fetch(config.sheetUrl, { signal: controller.signal });
            clearTimeout(timeoutId);

            let csvText = await response.text();
            // STRIP UTF-8 BOM if present
            if (csvText.charCodeAt(0) === 0xFEFF) {
                csvText = csvText.substring(1);
            }

            const rooms = this.parseCSV(csvText);

            if (Object.keys(rooms).length > 0) {
                localStorage.setItem(this.storageKey, JSON.stringify(rooms));
                this.updateConfig({ lastSync: new Date().toISOString() });
                return { success: true, message: 'Sync successful!' };
            }
            return { success: false, message: 'No valid data found. Check your column headers (ID, Name, Size, BedSize).' };
        } catch (error) {
            clearTimeout(timeoutId);
            console.error('Sync failed:', error);
            return { success: false, message: 'Fetch failed. Ensure your spreadsheet is "Published to web" as CSV.' };
        }
    }

    parseCSV(csvText) {
        const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '');
        if (lines.length < 2) return {};

        const headers = this.splitCSVLine(lines[0]);

        // Smart Column Finding
        const findColumn = (headers, synonyms) => {
            const lowerHeaders = headers.map(h => h.trim().toLowerCase());
            // 1. Try exact matches first
            for (let syn of synonyms) {
                const idx = lowerHeaders.indexOf(syn.toLowerCase());
                if (idx !== -1) return idx;
            }
            // 2. Try fuzzy (contains)
            for (let i = 0; i < lowerHeaders.length; i++) {
                for (let syn of synonyms) {
                    if (lowerHeaders[i].includes(syn.toLowerCase())) return i;
                }
            }
            return -1;
        };

        const idx = {
            id: findColumn(headers, ['ID', 'Room Number', 'RoomID', 'Room No']),
            name: findColumn(headers, ['Name', 'Room Name', 'Title', 'Type']),
            size: findColumn(headers, ['Size', 'Dimension', 'Area', 'Sqft']),
            bed: findColumn(headers, ['Bed', 'BedSize', 'Bed Size']),
            price: findColumn(headers, ['Price', 'Rate', 'Rent']),
            imgMain: findColumn(headers, ['MainImage', 'Image1', 'Photo1']),
            imgWindow: findColumn(headers, ['WindowImage', 'Image2', 'Photo2']),
            amenities: findColumn(headers, ['Amenities', 'Features', 'Facility'])
        };

        // Safety: ensure ID and Name aren't mistakenly swapped
        if (idx.id !== -1 && idx.id === idx.name) {
            const otherName = headers.findIndex((h, i) => i !== idx.id && (h.toLowerCase().includes('name') || h.toLowerCase().includes('title')));
            if (otherName !== -1) idx.name = otherName;
        }

        if (idx.id === -1) return {};

        const rooms = {};
        for (let i = 1; i < lines.length; i++) {
            const values = this.splitCSVLine(lines[i]);
            const getVal = (cIdx) => (cIdx !== -1 && values[cIdx]) ? values[cIdx].replace(/^"|"$/g, '').trim() : '';

            const roomId = getVal(idx.id);
            if (roomId) {
                const roomRawSize = getVal(idx.size);
                const roomRawBed = getVal(idx.bed);

                // VALIDATION: Must contain at least one number to be valid dimension
                const hasDigit = (str) => typeof str === 'string' && /\d/.test(str);
                
                const finalSize = hasDigit(roomRawSize) ? roomRawSize : (DEFAULT_ROOMS[roomId]?.size || '14 × 16 ft');
                const finalBed = hasDigit(roomRawBed) ? roomRawBed : (DEFAULT_ROOMS[roomId]?.bedSize || '6 × 7 ft');

                rooms[roomId] = {
                    name: getVal(idx.name) || `Room ${roomId}`,
                    size: finalSize,
                    bedSize: finalBed,
                    price: getVal(idx.price) || (DEFAULT_ROOMS[roomId]?.price || '2000'),
                    images: [
                        { src: RoomManager.convertGDriveLink(getVal(idx.imgMain)), category: 'Room View' },
                        { src: RoomManager.convertGDriveLink(getVal(idx.imgWindow)), category: 'Window View' }
                    ],
                    amenities: getVal(idx.amenities) ? getVal(idx.amenities).split(/[|;,]/).map(a => a.trim()) : (DEFAULT_ROOMS[roomId]?.amenities || [])
                };
            }
        }
        return rooms;
    }

    /**
     * Robust CSV line splitter that handles quotes and commas
     */
    splitCSVLine(line) {
        const result = [];
        let cur = "";
        let inQuote = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (char === '"') {
                inQuote = !inQuote;
            } else if (char === ',' && !inQuote) {
                result.push(cur.trim());
                cur = "";
            } else {
                cur += char;
            }
        }
        result.push(cur.trim());
        return result;
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
