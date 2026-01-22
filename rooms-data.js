/**
 * Bluebirds Homestay - Room Data Management System
 * Handles localStorage persistence and dynamic content
 */

const DEFAULT_ROOMS = {
    '101': {
        name: 'Deluxe Room 101',
        size: '14 × 16 ft',
        bedSize: '6 × 7 ft',
        weekdayPrice: '2000',
        weekendPrice: '2500',
        images: [
            { src: '/Users/jobin/.gemini/antigravity/brain/01aaeb87-cc2f-44f6-ad2e-d0b18e64bc98/room_101_main_1768541653997.png', caption: 'Room View' },
            { src: 'placeholder-window.jpg', caption: 'Window View' },
            { src: 'placeholder-frontage.jpg', caption: 'Room Frontage' },
            { src: 'placeholder-bathroom.jpg', caption: 'Bathroom' }
        ],
        amenities: ['Air Conditioning', 'King Size Bed', 'Private Bathroom', 'Hot Water', '64" Smart TV', 'Music System']
    },
    '102': {
        name: 'Deluxe Room 102',
        size: '14 × 16 ft',
        bedSize: '6 × 7 ft',
        weekdayPrice: '2000',
        weekendPrice: '2500',
        images: [
            { src: '/Users/jobin/.gemini/antigravity/brain/01aaeb87-cc2f-44f6-ad2e-d0b18e64bc98/room_102_main_1768541671794.png', caption: 'Room View' },
            { src: 'placeholder-window.jpg', caption: 'Window View' },
            { src: 'placeholder-frontage.jpg', caption: 'Room Frontage' },
            { src: 'placeholder-bathroom.jpg', caption: 'Bathroom' }
        ],
        amenities: ['Air Conditioning', 'King Size Bed', 'Private Bathroom', 'Hot Water', '64" Smart TV', 'Music System']
    },
    '103': {
        name: 'Deluxe Room 103',
        size: '14 × 16 ft',
        bedSize: '6 × 7 ft',
        weekdayPrice: '2000',
        weekendPrice: '2500',
        images: [
            { src: '/Users/jobin/.gemini/antigravity/brain/01aaeb87-cc2f-44f6-ad2e-d0b18e64bc98/room_103_main_1768541691301.png', caption: 'Room View' },
            { src: 'placeholder-window.jpg', caption: 'Window View' },
            { src: 'placeholder-frontage.jpg', caption: 'Room Frontage' },
            { src: 'placeholder-bathroom.jpg', caption: 'Bathroom' }
        ],
        amenities: ['Air Conditioning', 'King Size Bed', 'Private Bathroom', 'Hot Water', '64" Smart TV', 'Music System']
    },
    '104': {
        name: 'Deluxe Room 104',
        size: '14 × 16 ft',
        bedSize: '6 × 7 ft',
        weekdayPrice: '2000',
        weekendPrice: '2500',
        images: [
            { src: '/Users/jobin/.gemini/antigravity/brain/01aaeb87-cc2f-44f6-ad2e-d0b18e64bc98/room_104_main_1768541709309.png', caption: 'Room View' },
            { src: 'placeholder-window.jpg', caption: 'Window View' },
            { src: 'placeholder-frontage.jpg', caption: 'Room Frontage' },
            { src: 'placeholder-bathroom.jpg', caption: 'Bathroom' }
        ],
        amenities: ['Air Conditioning', 'King Size Bed', 'Private Bathroom', 'Hot Water', '64" Smart TV', 'Music System']
    },
    '106': {
        name: 'Deluxe Room 106',
        size: '14 × 16 ft',
        bedSize: '6 × 7 ft',
        weekdayPrice: '2000',
        weekendPrice: '2500',
        images: [
            { src: '/Users/jobin/.gemini/antigravity/brain/01aaeb87-cc2f-44f6-ad2e-d0b18e64bc98/room_106_main_1768541726497.png', caption: 'Room View' },
            { src: 'placeholder-window.jpg', caption: 'Window View' },
            { src: 'placeholder-frontage.jpg', caption: 'Room Frontage' },
            { src: 'placeholder-bathroom.jpg', caption: 'Bathroom' }
        ],
        amenities: ['Air Conditioning', 'King Size Bed', 'Private Bathroom', 'Hot Water', '64" Smart TV', 'Music System']
    },
    '107': {
        name: 'Deluxe Room 107',
        size: '14 × 16 ft',
        bedSize: '6 × 7 ft',
        weekdayPrice: '2000',
        weekendPrice: '2500',
        images: [
            { src: '/Users/jobin/.gemini/antigravity/brain/01aaeb87-cc2f-44f6-ad2e-d0b18e64bc98/room_107_main_1768541743971.png', caption: 'Room View' },
            { src: 'placeholder-window.jpg', caption: 'Window View' },
            { src: 'placeholder-frontage.jpg', caption: 'Room Frontage' },
            { src: 'placeholder-bathroom.jpg', caption: 'Bathroom' }
        ],
        amenities: ['Air Conditioning', 'King Size Bed', 'Private Bathroom', 'Hot Water', '64" Smart TV', 'Music System']
    },
    '108': {
        name: 'Room 108 - Dormitory',
        size: '20 × 24 ft',
        bedSize: '3 × 6 ft (each)',
        weekdayPrice: '1500',
        weekendPrice: '1800',
        images: [
            { src: 'placeholder-dormitory.jpg', caption: 'Dormitory View' },
            { src: 'placeholder-window.jpg', caption: 'Window View' },
            { src: 'placeholder-frontage.jpg', caption: 'Room Frontage' },
            { src: 'placeholder-bathroom.jpg', caption: 'Shared Bathroom' }
        ],
        amenities: ['Air Conditioning', 'Multiple Beds', 'Shared Bathroom', 'Hot Water', '64" Smart TV', 'Music System']
    }
};

const SUPABASE_URL = 'https://mvxnvgxyxdpjqwhcrpkv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_HEVYqUjtBfjAEQf-BjWy9w_2yTUQzT9';

// Local instance to avoid shadowing global 'supabase' from CDN
let supabaseClient = null;
try {
    if (typeof supabase !== 'undefined') {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
} catch (e) {
    console.error('Supabase client error:', e);
}

class RoomManager {
    constructor() {
        this.storageKey = 'bluebirds_rooms';
        this.supabase = supabaseClient;
        this.init();
    }

    async init() {
        console.group('RoomManager Initialization');

        // Load from localStorage first (offline capability)
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify(DEFAULT_ROOMS));
        }

        // Try to sync from Supabase
        await this.syncFromSupabase();

        console.groupEnd();
        return { success: true };
    }

    getAllRooms() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : DEFAULT_ROOMS;
    }

    async syncFromSupabase() {
        if (!this.supabase) {
            console.warn('Supabase not initialized');
            return { success: false, message: 'Supabase client missing' };
        }

        try {
            const { data, error } = await this.supabase
                .from('rooms')
                .select('*');

            if (error) throw error;

            if (data && data.length > 0) {
                const rooms = {};
                data.forEach(row => {
                    rooms[row.id] = {
                        name: row.name,
                        size: row.size,
                        bedSize: row.bed_size,
                        weekdayPrice: row.weekday_price,
                        weekendPrice: row.weekend_price,
                        images: row.images || [
                            { src: RoomManager.convertGDriveLink(row.image_main), caption: 'Room View' },
                            { src: RoomManager.convertGDriveLink(row.image_window), caption: 'Window View' }
                        ],
                        amenities: row.amenities || []
                    };
                });
                localStorage.setItem(this.storageKey, JSON.stringify(rooms));
                console.log('Synced with Supabase:', rooms);
                return { success: true };
            }
            return { success: false, message: 'No data in Supabase' };
        } catch (error) {
            console.error('Supabase Sync Error:', error.message);
            return { success: false, message: error.message };
        }
    }

    async updateRoom(id, data) {
        // Update local storage
        const rooms = this.getAllRooms();
        rooms[id] = { ...rooms[id], ...data };
        localStorage.setItem(this.storageKey, JSON.stringify(rooms));

        // Update Supabase
        if (this.supabase) {
            try {
                const { error } = await this.supabase
                    .from('rooms')
                    .upsert({
                        id: id,
                        name: data.name,
                        size: data.size,
                        bed_size: data.bedSize,
                        weekday_price: data.weekdayPrice,
                        weekend_price: data.weekendPrice,
                        image_main: data.images[0]?.src || '',
                        image_window: data.images[1]?.src || '',
                        images: data.images || [],  // Store full images array with captions
                        amenities: data.amenities || []
                    });
                if (error) throw error;
                return { success: true };
            } catch (error) {
                console.error('Supabase Update Error:', error.message);
                return { success: false, message: error.message };
            }
        }
        return { success: true }; // Local only if no supabase
    }

    async pushLocalToSupabase() {
        if (!this.supabase) return { success: false, message: 'Supabase client missing' };

        const rooms = this.getAllRooms();
        const rows = Object.keys(rooms).map(id => {
            const room = rooms[id];
            return {
                id: id,
                name: room.name,
                size: room.size,
                bed_size: room.bedSize,
                weekday_price: room.weekdayPrice,
                weekend_price: room.weekendPrice,
                image_main: room.images[0]?.src || '',
                image_window: room.images[1]?.src || '',
                amenities: room.amenities || []
            };
        });

        try {
            const { error } = await this.supabase
                .from('rooms')
                .upsert(rows);
            if (error) throw error;
            return { success: true, message: `Successfully pushed ${rows.length} rooms to Supabase!` };
        } catch (error) {
            console.error('Supabase Push Error:', error.message);
            return { success: false, message: error.message };
        }
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
