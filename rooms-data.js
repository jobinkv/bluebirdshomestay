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

class RoomManager {
    constructor() {
        this.storageKey = 'bluebirds_rooms';
        this.init();
    }

    init() {
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify(DEFAULT_ROOMS));
        }
    }

    getAllRooms() {
        return JSON.parse(localStorage.getItem(this.storageKey));
    }

    updateRoom(id, data) {
        const rooms = this.getAllRooms();
        rooms[id] = { ...rooms[id], ...data };
        localStorage.setItem(this.storageKey, JSON.stringify(rooms));
        return true;
    }

    /**
     * Converts a Google Drive share link to a direct download link
     */
    static convertGDriveLink(url) {
        if (!url) return '';
        const driveRegex = /https:\/\/drive\.google\.com\/file\/d\/([^\/]+)\//;
        const match = url.match(driveRegex);
        if (match && match[1]) {
            return `https://lh3.googleusercontent.com/u/0/d/${match[1]}=w1000`;
        }
        return url;
    }
}

const roomManager = new RoomManager();
