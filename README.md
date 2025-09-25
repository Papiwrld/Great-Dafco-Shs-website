# Great Dafco Senior High School Website

A responsive school website built with HTML, CSS, and JavaScript featuring the school's official colors (blue, yellow, and white) and comprehensive information about programs, admissions, and contact details.

## 🎨 Design Features

- **School Colors**: Blue (#1e40af), Yellow (#fbbf24), and White (#ffffff)
- **Responsive Design**: Mobile-first approach with clean, professional layout
- **Interactive Elements**: Mobile navigation, image slider, form validation
- **Modern UI**: Clean typography, smooth animations, and intuitive navigation

## 📁 File Structure

```
School Website Project/
├── index.html          # Homepage
├── programmes.html     # Programs page
├── admissions.html     # Admissions page
├── contact.html        # Contact page
├── style.css          # Main stylesheet
├── script.js          # JavaScript functionality
└── README.md          # This file
```

## 📄 Pages Overview

### 1. Homepage (index.html)
- **Hero Section**: School name, tagline, and banner image
- **Vision, Mission & Core Values**: Three-column layout with school principles
- **About Us**: Information about the school with image
- **Image Gallery**: Slideshow with placeholder images
- **Call-to-Action**: Link to admissions page

### 2. Programmes Page (programmes.html)
- **Regular Programmes**:
  - General Arts
  - General Science
  - Business
  - Visual Arts
  - Home Economics
- **Non-Regular Programmes**:
  - Remedial Series
  - Adult Education
  - Music and Culture
  - Sports and Games
  - Catering and Fashion Design
  - Farming
  - Robotics and Software Development

### 3. Admissions Page (admissions.html)
- **Admission Information**: Requirements, process, and important dates
- **Application Form**: Comprehensive form with validation
- **Contact Information**: Admission and academic office details

### 4. Contact Page (contact.html)
- **Contact Details**: Director, Admission Office, and Academic Office
- **Contact Form**: Message form with validation
- **Location Information**: Campus visit details and interactive Google Maps
- **Quick Contact**: Direct links for calling, emailing, and applying

## 🛠️ How to Update Content

### Updating Text Content

1. **School Information**: Edit the content in each HTML file
2. **Contact Information**: Update contact details in `contact.html` and footer sections
3. **Programmes**: Modify programme descriptions in `programmes.html`
4. **Admission Requirements**: Update requirements and dates in `admissions.html`

### Replacing Placeholder Images

The website includes placeholder images that can be replaced with actual school photos:

#### Homepage Images:
1. **Hero Banner**: Replace the banner image in the hero section
   ```html
   <img src="https://via.placeholder.com/800x400/1e40af/ffffff?text=School+Banner" alt="School Banner" class="banner-image">
   ```

2. **About Section Image**: 
   ```html
   <img src="https://via.placeholder.com/500x300/1e40af/ffffff?text=School+Building" alt="School Building">
   ```

3. **Gallery Images**: 
   ```html
   <img src="https://via.placeholder.com/800x500/1e40af/ffffff?text=Classroom+1" alt="Classroom">
   <img src="https://via.placeholder.com/800x500/1e40af/ffffff?text=Library" alt="Library">
   <img src="https://via.placeholder.com/800x500/1e40af/ffffff?text=Laboratory" alt="Laboratory">
   <img src="https://via.placeholder.com/800x500/1e40af/ffffff?text=Sports+Field" alt="Sports Field">
   ```

#### Contact Page:
4. **Location Map**: The contact page now includes an interactive Google Maps iframe showing the school's location in Kumasi, Ghana. The map is fully responsive and styled to match the website design.

### Steps to Replace Images:

1. **Prepare Images**: 
   - Resize images to recommended dimensions
   - Use formats: JPG, PNG, or WebP
   - Optimize for web (compress for faster loading)

2. **Create Images Folder**:
   ```
   School Website Project/
   ├── images/
   │   ├── banner.jpg
   │   ├── school-building.jpg
   │   ├── classroom.jpg
   │   ├── library.jpg
   │   ├── laboratory.jpg
   │   └── sports-field.jpg
   ```

3. **Update Image Paths**: Replace placeholder URLs with local image paths
   ```html
   <!-- Before -->
   <img src="https://via.placeholder.com/800x400/1e40af/ffffff?text=School+Banner" alt="School Banner">
   
   <!-- After -->
   <img src="images/banner.jpg" alt="School Banner">
   ```

## 🎨 Customizing Colors

The website uses CSS custom properties for easy color customization. In `style.css`, update these variables:

```css
:root {
    --primary-blue: #1e40af;      /* Main blue color */
    --secondary-blue: #3b82f6;    /* Lighter blue */
    --light-blue: #dbeafe;        /* Very light blue */
    --primary-yellow: #fbbf24;    /* Main yellow color */
    --secondary-yellow: #f59e0b;  /* Darker yellow */
    --light-yellow: #fef3c7;      /* Very light yellow */
    --white: #ffffff;             /* White background */
}
```

## 📱 Responsive Features

- **Mobile Navigation**: Hamburger menu for mobile devices
- **Flexible Grid**: Responsive grid layouts that adapt to screen size
- **Touch Support**: Swipe gestures for image slider on mobile
- **Optimized Typography**: Readable text sizes across all devices
- **Responsive Maps**: Google Maps iframe adapts to different screen sizes
- **Mobile-First Design**: Optimized for mobile devices with progressive enhancement

## ⚡ JavaScript Features

- **Mobile Menu Toggle**: Responsive navigation with smooth animations
- **Image Slider**: Auto-advancing slideshow with manual controls and touch support
- **Form Validation**: Real-time validation for admission and contact forms
- **Smooth Scrolling**: Enhanced user experience with smooth page transitions
- **Back to Top Button**: Easy navigation for long pages
- **Touch/Swipe Support**: Mobile-friendly slider controls
- **Keyboard Navigation**: Arrow key support for image slider
- **Accessibility Features**: Focus management and screen reader support

## 🚀 Getting Started

1. **Download Files**: Save all files in the same directory
2. **Open Website**: Open `index.html` in a web browser
3. **Test Responsiveness**: Resize browser window to test mobile layout
4. **Test Interactive Features**: Try the mobile menu, image slider, and forms
5. **Replace Images**: Follow the image replacement guide above
6. **Update Content**: Modify text content as needed
7. **Customize Map**: The Google Maps iframe can be updated with a new embed code if needed

## 📞 Contact Information

The website includes the following contact details:

- **Director**: John Owusu Ogbordjor
  - Email: Ogbojohn@gmail.com
  - Phone: 0243537124

- **Admission Office**:
  - Email: gdafwshs@gmail.com
  - Phone: 0548357042

- **Academic Office**:
  - Email: greatdafwaca25@gmail.com
  - Phone: 0249183565 / 0501326757

## 🔧 Technical Requirements

- **Web Browser**: Modern browser with JavaScript enabled
- **No Server Required**: Website runs entirely in the browser
- **File Hosting**: Can be hosted on any web server or static hosting service
- **Internet Connection**: Required for Google Maps to load properly
- **Mobile Compatible**: Works on all modern mobile devices and tablets

## 📝 Form Functionality

### Admission Form Features:
- Real-time validation
- Required field checking
- Email format validation
- Phone number validation
- Age verification (15-25 years)
- Terms and conditions agreement

### Contact Form Features:
- Name and email validation
- Subject selection
- Message length validation
- Success/error messaging

## 🎯 SEO Considerations

- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- Meta descriptions (can be added)
- Clean URL structure

## 🗺️ Google Maps Integration

The contact page includes an interactive Google Maps iframe showing the school's location:

- **Location**: Bomso Road, Kumasi, Ghana
- **Responsive Design**: Automatically adjusts to different screen sizes
- **Interactive Features**: Users can zoom, pan, and get directions
- **Accessibility**: Includes proper title and loading attributes
- **Performance**: Lazy loading for better page performance

### Updating the Map:
To change the map location, replace the iframe `src` attribute in `contact.html` with a new Google Maps embed URL.

## 🔄 Future Enhancements

Potential improvements that can be added:
- Backend form processing
- Database integration
- User authentication
- Content management system
- Multi-language support
- Advanced image gallery
- News/blog section
- Online application tracking
- Student portal integration
- Event calendar
- Photo gallery with lightbox

## 📄 License

This website is created for Great Dafco Senior High School. All rights reserved.
Developed by with 
**Awagah Eugene Kwesi**  with ❤.
Frontend Developer | HTML, CSS, JavaScript  

📧 Email: kwesieugene77@gmail.com  
🔗 Portfolio: [https://awagahsportfolio.netlify.app](#) 

---

