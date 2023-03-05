// Varibles
const copyEmoji = document.querySelector("[data-copyEmoji]");
const copyBtn = document.querySelector("[data-btnCopy]");
const copyMsg = document.querySelector("[data-copyMsg]");

const emojiCount = document.querySelector("[data-emojiCount]")


const happyCheck = document.querySelector("[data-happyCheck]")
const loveCheck = document.querySelector("[data-loveCheck]")
const crazyCheck = document.querySelector("[data-crazyCheck]")
const fearCheck = document.querySelector("[data-fearCheck]")
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const slider = document.querySelector("[data-slider]")
const happySlider = document.querySelector("[data-happySlider]")
const loveSlider = document.querySelector("[data-loveSlider]")
const crazySlider = document.querySelector("[data-crazySlider]")
const fearSlider = document.querySelector("[data-fearSlider]")
const allSliders = document.getElementsByClassName("fslider");

const happyEmoji = document.querySelector("[data-happyEmoji]")
const loveEmoji = document.querySelector("[data-loveEmoji]")
const crazyEmoji = document.querySelector("[data-crazyEmoji]")
const fearEmoji = document.querySelector("[data-fearEmoji]")

const generateBtn = document.querySelector("[data-getFeelingBtn]");
const btnMessage = document.querySelector("[data-btnMessage]");
// Data set
const happy = ['🙂', '😃', '😄', '😇', '😊', '🙃', '😁', '😆', '🤭', '😂', '🤣', '🤣'];
const love = ['😊', '🤗', '❤️', '🤭', '😙', '😚', '😘', '🥰', '💖', '🥰', '😍', '💞'];
const crazy = ['😛', '😋', '🧐', '💩', '😜', '🤮', '🤪', '😝', '🤑', '😈', '🥴', '🤪'];
const fear = ['😐', '🙄', '😟', '👻', '😯', '😲', '😣', '😖', '😫', '😱', '😨', '😭'];
const arrMin = [0, 3, 3, 9];
const arrMax = [3, 6, 9, 12];
// console.log(slider.value)

// Initaial value============================================
let countEmoji = 10;
let checkCount = 1;
handleSlider();
handleEmojiSlider(happySlider, 1, happyEmoji, happy);
handleEmojiSlider(loveSlider, 2, loveEmoji, love);
handleEmojiSlider(crazySlider, 3, crazyEmoji, crazy);
handleEmojiSlider(fearSlider, 4, fearEmoji, fear);
// Functons==================================================
function handleSlider() {
    slider.value = countEmoji;
    emojiCount.innerText = countEmoji;
    // background
    slider.style.backgroundSize = (countEmoji / 20) * 100 + "% 100%"
}

function handleEmojiSlider(emojiSlider, value, emoji, emojiArr) {
    emojiSlider.value = value;
    emoji.innerText = emojiArr[(value - 1) * 3];
    emojiSlider.style.backgroundSize = ((value - 1) / 3) * 100 + "% 100%";
}

function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getHappy() {
    const min = arrMin[document.getElementById('happyId').value - 1];
    const max = arrMax[document.getElementById('happyId').value - 1];
    return happy[getRandInt(min, max)];
}
function getLove() {
    const min = arrMin[document.getElementById('loveId').value - 1];
    const max = arrMax[document.getElementById('loveId').value - 1];
    return love[getRandInt(min, max)];
}
function getCrazy() {
    const min = arrMin[document.getElementById('crazyId').value - 1];
    const max = arrMax[document.getElementById('crazyId').value - 1];
    return crazy[getRandInt(min, max)];
}
function getFear() {
    const min = arrMin[document.getElementById('fearId').value - 1];
    const max = arrMax[document.getElementById('fearId').value - 1];
    return fear[getRandInt(min, max)];
}
// Listeners=================================================
// Copy Button
async function copyPassword() {
    if (copyEmoji.innerText != "Select Feelings") {
        try {
            await navigator.clipboard.writeText(copyEmoji.innerText)
            copyMsg.innerText = "Copied";
        } catch (e) {
            copyMsg.innerText = "Failed";
        }
    } else {
        copyMsg.innerText = "Select Feeling";
    }
    // show Message
    copyMsg.classList.add("active");
    // remove Message
    setTimeout(() => {
        copyMsg.classList.remove("active");

    }, 2000);
}

copyBtn.addEventListener('click', copyPassword)

// Main Slider
slider.addEventListener('input', function (slider) {
    countEmoji = slider.target.value;
    handleSlider();
})

// Feelings Slider
happySlider.addEventListener('input', function (slider) {
    let value = slider.target.value;
    handleEmojiSlider(happySlider, value, happyEmoji, happy);
})
loveSlider.addEventListener('input', function (slider) {
    let value = slider.target.value;
    handleEmojiSlider(loveSlider, value, loveEmoji, love);
})
crazySlider.addEventListener('input', function (slider) {
    let value = slider.target.value;
    handleEmojiSlider(crazySlider, value, crazyEmoji, crazy);
})
fearSlider.addEventListener('input', function (slider) {
    let value = slider.target.value;
    handleEmojiSlider(fearSlider, value, fearEmoji, fear);
})

// Check Boxes
function handleCheckBoxes() {
    checkCount = 0;
    allCheckBox.forEach((checkBox) => {
        if (checkBox.checked)
            checkCount++;
    })
    // console.log(checkCount);
}

allCheckBox.forEach((checkBox) => {
    checkBox.addEventListener('click', handleCheckBoxes);
})

// Generate Button
generateBtn.addEventListener('click', () => {
    if (checkCount == 0) {
        copyEmoji.innerText = "Select Feelings";
        btnMessage.classList.add("active");
        setTimeout(() => {
            btnMessage.classList.remove("active");
        }, 2000);

        return;
    }
    const funArr = [];
    if (happyCheck.checked)
        funArr.push(getHappy);
    if (loveCheck.checked)
        funArr.push(getLove);
    if (crazyCheck.checked)
        funArr.push(getCrazy);
    if (fearCheck.checked)
        funArr.push(getFear);

    let emojiString = "";

    for (let i = 0; i < countEmoji; i++) {
        emojiString += funArr[getRandInt(0, funArr.length)]();
    }

    // console.log(emojiString);
    copyEmoji.innerText = emojiString;
})




