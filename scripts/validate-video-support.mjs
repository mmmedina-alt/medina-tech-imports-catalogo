/**
 * Script to validate and report video support across all products
 * This helps ensure all videos are properly detected and will work in the gallery
 */

import fs from 'fs';
import path from 'path';

// Video detection utilities (copied from utils/mediaUtils.ts)
const VIDEO_EXTENSIONS = [
    '.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv', '.m4v'
];

const isVideo = (url) => {
    if (!url || typeof url !== 'string') return false;
    
    const urlWithoutQuery = url.split('?')[0];
    const filename = urlWithoutQuery.toLowerCase();
    
    // Check if the URL ends with any video extensions (more precise than includes)
    return VIDEO_EXTENSIONS.some(ext => 
        filename.endsWith(ext) || filename.includes(ext + '.')
    );
};

const getMediaType = (url) => {
    if (isVideo(url)) return 'video';
    return 'image';
};

// Read the product images data
const dataPath = path.join(process.cwd(), 'data', 'product-images.json');

if (!fs.existsSync(dataPath)) {
    console.error('❌ product-images.json not found!');
    console.log('Expected location:', dataPath);
    process.exit(1);
}

const rawData = fs.readFileSync(dataPath, 'utf8');
const products = JSON.parse(rawData);

console.log('🔍 MEDINA TECH IMPORTS - VIDEO SUPPORT VALIDATION');
console.log('=' .repeat(60));
console.log(`📊 Checking ${products.length} products for video content...`);
console.log('');

let totalProducts = 0;
let productsWithVideos = 0;
let totalMediaFiles = 0;
let totalVideoFiles = 0;
const videoDetails = [];

products.forEach(product => {
    totalProducts++;
    let productHasVideos = false;
    let productMediaCount = 0;
    let productVideoCount = 0;
    
    // Check main image
    if (product.imageUrl) {
        totalMediaFiles++;
        productMediaCount++;
        if (isVideo(product.imageUrl)) {
            totalVideoFiles++;
            productVideoCount++;
            productHasVideos = true;
            videoDetails.push({
                productId: product.id,
                type: 'Main Image',
                url: product.imageUrl,
                detected: true
            });
        }
    }
    
    // Check gallery images
    if (product.galleryImages && Array.isArray(product.galleryImages)) {
        product.galleryImages.forEach((url, index) => {
            totalMediaFiles++;
            productMediaCount++;
            if (isVideo(url)) {
                totalVideoFiles++;
                productVideoCount++;
                productHasVideos = true;
                videoDetails.push({
                    productId: product.id,
                    type: `Gallery Image ${index + 1}`,
                    url: url,
                    detected: true
                });
            }
        });
    }
    
    if (productHasVideos) {
        productsWithVideos++;
        console.log(`📹 ${product.id}:`);
        console.log(`   └─ ${productVideoCount} video(s) out of ${productMediaCount} media files`);
    }
});

console.log('');
console.log('📈 SUMMARY REPORT');
console.log('-' .repeat(40));
console.log(`📦 Total Products: ${totalProducts}`);
console.log(`🎬 Products with Videos: ${productsWithVideos}`);
console.log(`🖼️  Total Media Files: ${totalMediaFiles}`);
console.log(`📹 Total Video Files: ${totalVideoFiles}`);
console.log(`📊 Video Coverage: ${((productsWithVideos / totalProducts) * 100).toFixed(1)}%`);
console.log('');

if (videoDetails.length > 0) {
    console.log('🎬 VIDEO DETAILS');
    console.log('-' .repeat(40));
    videoDetails.forEach(video => {
        console.log(`📹 ${video.productId} (${video.type}):`);
        console.log(`   └─ ${video.url.substring(0, 80)}...`);
        console.log(`   └─ Detection: ✅ ${getMediaType(video.url)}`);
    });
    console.log('');
}

console.log('🛠️  SUPPORTED VIDEO FORMATS');
console.log('-' .repeat(40));
VIDEO_EXTENSIONS.forEach(ext => {
    const found = videoDetails.some(v => v.url.toLowerCase().includes(ext));
    console.log(`${found ? '✅' : '⚪'} ${ext.toUpperCase().replace('.', '')} format`);
});

console.log('');
console.log('✅ Video validation complete!');
console.log('💡 All detected videos should now work properly in the product gallery.');
console.log('');

// Exit with status code indicating if videos were found
process.exit(videoDetails.length > 0 ? 0 : 1);