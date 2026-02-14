# Château Techno Website - Documentation

Welcome to the code for your festival website! Since you mentioned you're new to this, here is a simple breakdown of how it works.

## 📂 Project Structure

Here are the main files you need to know about:

### 1. `index.html` (The Skeleton)
This is the main file. It contains the **structure** and **content** of your website (text, links, the order of sections).
- **Edit this file to:** Change the FAQ text, reorder sections, or change the Soundcloud links.

### 2. `css/style.css` (The Look)
 This file controls the **design** (colors, fonts, spacing, mobile layout).
- **Edit this file to:** Change the purple neon color, adjust font sizes, or change the background.

### 3. `js/script.js` (The Brains)
This file handles the **logic** (interactive parts).
- **It controls:** The Countdown Timer, the FAQ accordion (opening/closing), and loading the Lineup.

### 4. `images/` (The Media)
- **`logo/`**: Contains your logo.
- **`impressions/`**: Contains the 6 pictures for the "Eindrücke" section.
- **`lineup/`**: Contains the round pictures for the DJs.

---

## ❓ The Lineup Question: `json` vs `script.js`

You noticed the lineup data is in two places. Here is why:

1.  **`lineup.json`**: This is a standalone data file. It is the "cleanest" way to store data.
2.  **`script.js`**: I added a copy of the data here as a **backup**.

**How it works:**
When the website loads, it tries to read `lineup.json` first (the separate data file).
- If it works (like on the real website), it uses the JSON.
- If it fails (which sometimes happens if you just open the file on your computer without a server), it falls back to the list hardcoded inside `script.js`.

**Recommendation:**
To keep it simple, **you should update `lineup.json`** when you want to change the lineup. The website on GitHub will use that file.

If you ever see the old lineup appearing on your phone but the new one on your computer, you might need to update the backup list in `script.js` too, but usually, updating the JSON is enough.

## 🛠 How to Modify Things

### Changing the Countdown Date
Open `js/script.js` and look for this line (around line 105):
```javascript
const countDownDate = new Date("2026-09-04T18:00:00+02:00").getTime();
```
Change the date to whatever you need.

### Adding a DJ
Open `lineup.json` and add a new block like this:
```json
{
  "name": "New DJ Name",
  "image": "images/lineup/filename.png",
  "soundcloud": "https://soundcloud.com/link"
}
```
*Make sure the image file exists in the folder!*

### Adding/Removing FAQ
Open `index.html`. Each question is a block like this:
```html
<div class="faq-item">
    <button class="faq-question">Question Here?</button>
    <div class="faq-answer">
        <p>Answer Here.</p>
    </div>
</div>
```
Copy and paste to add new ones.
