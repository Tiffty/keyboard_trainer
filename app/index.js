


// VIRIABLES THAT ARE NEEDED AT START:


let seconds = 0;	// Seconds counter to update every second
let pointer = 0;	// Current positionsin the text
let currentText;	// Contain copy of random text from the list 
let currentText1;	// Contain copy of random text from the list
let currentText2;	// Contain copy of random text from the list
let currentChar;	// Contain a Char, which must be inputed to preceed and delete this Char in text	
let mistakes = 0;   // Counter for mistakes
let isStartup = true;		// It is starup of the page
let isRestart = false;		// true than "Reset" button clicked
let sec = 0; 				// Set timer speed to +0/sec
let correctlyInputed = 0; 	// Counter for number of correctly inputed chatacters
let randStart = 0;			// starting point in finding random text pack (depends on which checkboxes are chosen)
let randFinish = 0;			// finishing point in finding random text pack (depends on which checkboxes are chosen)
let randPack = 0;			// contains id of a random text pack, 0 by default
let textColorOfTheme = '#1a1a1a'; 	// if it is light theme - text is close to black, if dark - close to white
let colorOfTheme1 = '#d7e0ce'; 		// one of the color of current theme
let colorOfTheme2 = '#f0f5eb'; 		// one of the color of current theme
let colorOfTheme3 = 'white'; 		// one of the color of current theme
let outputMode = 0; 				// Trainer mode 0 - inputed symbols are cut, 1 - inputed symbols become green
let lang = 'eng' 	// UI Language, "eng" - English, "ukr"  - Ukrainian, "rus" - Russian
let keyCodePressed;	// code of the key pressed
let doCountFrames = false;	// needed to count frames of key.pressed == true, then to make it false



// BUTTONS FROM HTML:


const closeBtn = document.getElementById("close-btn");	// Buttons of Settings
const rules = document.getElementById("settings"); 
settingsBtn.addEventListener("click", () => openSettings());
closeBtn.addEventListener("click", () => applySettings());

const startBtn = document.getElementById("startBtn"); 	// Button to start the trainer
startBtn.addEventListener("click", () => startTrainer());

const pauseBtn = document.getElementById("pauseBtn"); 	// Button to pause the trainer
pauseBtn.addEventListener("click", () => pauseTrainer());
document.getElementById("pauseBtn").disabled = true;


const reloadBtn = document.getElementById("reloadBtn"); 	// Button to reload current text
reloadBtn.addEventListener("click", () => printNewText());
document.getElementById("reloadBtn").disabled = true;

const resetBtn = document.getElementById("resetBtn"); 	// Button reset the trainer
resetBtn.addEventListener("click", () => resetTrainer());
document.getElementById("resetBtn").disabled = true;



// MAIN CODE:


function getPacks() {		// check checkboxes to get range for random in choosing text pack

	if (selectTextPack.selectEng.checked) {	// if "English text" checked
		randFinish = 0;	   // set finish random for *2
	}
	if (selectTextPack.selectUkr.checked) { // if "Ukrainian text" checked
		randFinish = 1;
	}
	if (selectTextPack.selectRus.checked) { // if "Russian text" checked
		randFinish = 2;
	}
	if (selectTextPack.selectRus.checked) { // if "Russian text" checked
		randStart = 2;		// set start random for *2
	}
	if (selectTextPack.selectUkr.checked) { // if "Ukrainian text" checked
		randStart = 1;
	}
	if (selectTextPack.selectEng.checked) {	// if "English text" checked
		randStart = 0;
	}
}


function changeButtonsOnSR() { 	// Change values and clickability of buttons 
	if (lang == 'eng') startBtn.value = 'Resume';	// 		by pressing "Start" or "Resume" buttons in html
	if (lang == 'rus') startBtn.value = 'Продолжить';
	if (lang == 'ukr') startBtn.value = 'Продовжити';
	document.getElementById("startBtn").disabled = true;
	document.getElementById("pauseBtn").disabled = false;
	document.getElementById("resetBtn").disabled = false;
	document.getElementById("reloadBtn").disabled = false;
}


function startTrainer() {
	mistakes = 0;
	if (isStartup) {	// If button clicked before the trainer started before 
		isRestart = false; // debug nedded
		sec = 1;
		timer();			// start the timer
		printNewText();		// Print random text on a startup of the page
		isStartup = false;	// After this startTrainer() will work as a "resume"
		changeButtonsOnSR(); //Change values and clickability of buttons
		update();			 // Start code in update() (calls itself every frame)
		getPacks();			// get random range for packs

	} else if (isRestart) {
		isRestart = false;
		sec = 1;
		printNewText();		// Print random text on a startup of the page
		isStartup = false;	// After this startTrainer() will work as a "resume"
		changeButtonsOnSR(); //Change values and clickability of buttons
		update();			 // Start code in update() (calls itself every frame)
		getPacks();			// get random range for packs

	} else {	//If button clicked after the trainer started (as a "resume")
		sec = 1;	// Resume timer (+1/sec)
		changeButtonsOnSR(); //Change values and clickability of buttons
	}
}


function pauseTrainer() {
	document.getElementById("pauseBtn").disabled = true;	//Change clickability of buttons
	document.getElementById("startBtn").disabled = false;	//		by pressing "Pause" button in html
	sec = 0;	// pause the timer (+0/sec)
}


function resetTrainer() {

	isRestart = true;
	sec = 0;	// pause the timer (+0/sec)
	seconds = 0;	// reset time
	mistakes = 0;	// reset mistakes
	correctlyInputed = 0;	// resert correctly inputed characters
	if (lang == 'eng') startBtn.value = 'Start';	// fix the buttons
	if (lang == 'rus' || lang == 'ukr') startBtn.value = 'Старт';
	currentText = '⠀';	// make strings "empty"
	currentText1 = '⠀';
	currentText2 = '⠀';

	document.getElementById('mistakes').style.backgroundColor = colorOfTheme1;

	document.getElementById('outSource').innerHTML= '⠀';	// output text in html
	document.getElementById('outText').innerHTML = '⠀';

	document.getElementById("startBtn").disabled = false;	//Change clickability of buttons 
	document.getElementById("pauseBtn").disabled = true;	// 		by pressing "Reset" button in html
	document.getElementById("resetBtn").disabled = true;
	document.getElementById("reloadBtn").disabled = true;
}


let lastId;  	//contains id of the last text, to prevent random function from choosing the same text

function printNewText() {	// Prints random text in full size (without slicing)

	pointer = 0;	// set input pointer to 0;

	getPacks();			// get random range for packs

	randPack = randomInt(randStart, randFinish+1);	// *2, find random index to choose a text pack

	let isRandomChoseUnchecked;	// (bool) is random function chose unchecked checkbox

	do {	// first iteration must be done in any way
		for (let j = randStart+1; j < randFinish; j++) {	// all checkboxes within range of random
        	if ( !selectTextPack[j].checked && j == randPack ) { // if random chose unchecked checkbox
        		randPack = randomInt(randStart, randFinish+1);	 // find another randPack 
        		isRandomChoseUnchecked = true;	// yes, random chose unchecked checkbox
        	} else { isRandomChoseUnchecked = false; } // no, random chose checked checkbox
    	}
	} while ( isRandomChoseUnchecked );	// do until random choose checked checkbox

	do {	// *1

		if (randPack == 0) {
			i = randomInt(0, textEng.length);	// find random index in English pack
			currentText = textEng[i].text;			// find text by random index
			document.getElementById('outSource').innerHTML= textEng[i].source;	// output source of a text in html
			document.getElementById('outText').innerHTML = '<p>' + currentText;	// output a text in html
		}

		else if (randPack == 1) {
			i = randomInt(0, textUkr.length);	// find random index in Ukrainian pack
			currentText = textUkr[i].text;			// find text by random index
			document.getElementById('outSource').innerHTML= textUkr[i].source;	// output source of a text in html
			document.getElementById('outText').innerHTML = '<p>' + currentText;	// output a text in html
		}

		else if (randPack == 2) {
			i = randomInt(0, textRus.length);	// find random index in Russian pack
			currentText = textRus[i].text;			// find text by random index
			document.getElementById('outSource').innerHTML= textRus[i].source;	// output source of a text in html
			document.getElementById('outText').innerHTML = '<p>' + currentText;	// output a text in html
		}
			
	} while (i == lastId);	// To prevent random from choosing the same text 

	currentText1 = currentText;		// currentText1 is a green text (already inputed)
	currentText2 = currentText;		// currentText2 is not yet inputed text (black or white)
	
	lastId = i;	// id of the last printed text, needed to prevent printing the same text twice
}


function strReplace(str){     // replaces spaces in string with "_", argument is string, returns fixed string
    let fixedStr = str.replace(" ", "_");
    return fixedStr;
}


function printSlicedText() { 	// Prints random text with slicing first Char

	currentText2 = currentText;	// currentText2 is black (right) part of outputted string
 
	let fakeSpace = '';	// fakeSpace is grey "_", which appears in text if next symbol to input is space
						// It is a tip for a user to input space. It is empty string by default
	if (currentText[1] == ' ' && outputMode == 0) { 	// If next symbol to input is space and mode == 0
		fakeSpace = '<span style="color: #c4c4c4;">_</span>';	// fakeSpace now contains grey "_"
		currentText2 = currentText2.slice(1, currentText2.length);	// slice black (right) part of outputted string
	}

	if (currentText[1] == ' ' && outputMode == 1) { 	// If next symbol to input is space and mode == 1
		fakeSpace = '_';	
		currentText2 = currentText2.slice(1, currentText2.length);	
	}
	
	currentText = currentText.slice(1, currentText.length);		// Slice first char
	currentText2 = currentText2.slice(1, currentText2.length);	// Slice first char
	currentText1 = strReplace(currentText1); 
	if (outputMode == 0) {												// if mode 0 is chosen (green inputed + black not inputed)
		document.getElementById('outText').innerHTML =
			'<p style="color:#7fad68">' + currentText1.slice(0, pointer+1) + //pring green text (inputed) to to pointer
		 	fakeSpace + // if next char is space - print "_", if not, print nothing
			'<span style="color: ' + 
			textColorOfTheme + // if it is light theme - color is close to black, dark - close to white
			';">' + 
			currentText2 + // print text that is not inputed yet
			'</span> </p>'; 
	} else if (outputMode == 1) {										// if mode 1 is chosen (only black not inputed)
		document.getElementById('outText').innerHTML = '<p style="color:' + textColorOfTheme + '">' + fakeSpace + currentText2 + '</p>';
	}
}


function justPrintSlicedText() { // same as printSlicedText(), but without slicing currentText2
								 // (to reprint text than switching theme)
	let fakeSpace = '';

	if (currentText[0] == ' ' && outputMode == 0) {
		fakeSpace = '<span style="color: #c4c4c4;">_</span>';
	}

	if (currentText[0] == ' ' && outputMode == 1) {
		fakeSpace = '<span style="color: #c4c4c4;">_</span>';	
	}

	if (outputMode == 0) {
		document.getElementById('outText').innerHTML =
			'<p style="color:#7fad68">' + currentText1.slice(0, pointer) + 
		 	fakeSpace + 
			'<span style="color: ' + 
			textColorOfTheme + 
			';">' + 
			currentText2 + 
			'</span> </p>'; 
	} else if (outputMode == 1) {
		document.getElementById('outText').innerHTML = '<p style="color:' + textColorOfTheme + '">' + fakeSpace + currentText2 + '</p>';
	}
}


function randomInt(min, max) {		// Find random integer within range
	return min + Math.floor((max - min) * Math.random());
}


document.onkeypress = function(evt) {	// Function executed than any key is pressed
	
		// Part 1: get the Char in CharInputed

	    evt = evt || window.event;
	    let keyCode = evt.keyCode || evt.which;		// code of inputed key
	    CharInputed = String.fromCharCode(keyCode);	// inputed char
	   	keyCodePressed = keyCode;					// copy the code of inputed key (needed outside this function)

	   	doCountFrames = true;		// count frames on which key.pressed == true

	if (!isStartup) {  // do not execute code below befo3re clicking Start button

	    //Part 2: check if 'CharInputed' == 'currentChar'

	     currentChar = currentText[0];	// Char to delete next
	
	    if (currentChar == CharInputed) {	// If inputed Char == Char to delete next
	    	printSlicedText();	// then slice string (delete [0] Char)
	    	correctlyInputed++;	// +1 correctly inputed char
	    	pointer++;	// move pointer +1 right 
	    	document.getElementById('mistakes').style.backgroundColor = colorOfTheme1;
	    } else { 		// if inputed Char != Char to delete next
	    	
	    	if (!isRestart) {	// if it is not restart (state after clicking Reset button)
	    	mistakes++;	// increment mistakes counter
	    	document.getElementById('mistakes').style.backgroundColor = '#f07769'; // maked mistakes red
	    	 }	
	    }

	    //Part 3: check if text ended with last key press

	    if (currentText.length == 0) {	// if ended
	    	printNewText();		// print random text
	    }
	} 
};


let minutes;	// Counter for minutes

function timer() {		// Timer function

	seconds = 0;	// set at  astartup of a fucntion (starts with "start" button in html and never stops)
	let outTime = document.getElementById('outTime');	// Link outTime variable with id='outTime' in html

	function everySecond() {	// Function called every second (for the code that must be executed every second)

    	seconds += sec;		// in normal mode sec = 1 (+1/sec, timer works), in pause mode sec = 0 (+0/sec, timer stops)
    	minutes = Math.floor(seconds / 60);	// calculating minutes

    	let resSec = (seconds - (minutes * 60)); // residual seconds (seconds to print in timer)

    	
    	if (minutes == 0 && seconds < 10) {					// outputing time in html using different patterns
    		outTime.innerText = '00:0' + seconds;	
		} 
		else if (minutes == 0 && seconds < 60) {
    		outTime.innerText = '00:' + seconds;	
		}
    	else if (minutes < 10 && resSec < 10) {
    		outTime.innerText = '0' + minutes + ':0' + resSec;
    	} 
    	else if (minutes < 10 && resSec >= 10) {
    		outTime.innerText = '0' + minutes + ':' + resSec;
    	}
    	else if (minutes >= 10 && resSec < 10) {
    		outTime.innerText = minutes + ':0' + resSec;
    	}
    	else if (minutes >= 10 && resSec >= 10) {
    		outTime.innerText = minutes + ':' + resSec;
    	}

	}

	let cancel = setInterval(everySecond, 1000);	// set interval between calls to 1000 mileseconds (1 second)
}


let speedPerSec = 0; //Speed: 0 char/sec
let speedPerMin = 0; //Speed: 0 char/min
let speedPerSecMax = 0; //Speed: 0 char/sec
let speedPerMinMax = 0; //Speed: 0 char/min

function printSpeed() {
	speedPerSec = +((correctlyInputed / seconds).toFixed(1));	// Calculating char/second speed
	if (speedPerSecMax < speedPerSec) { speedPerSecMax = speedPerSec; }		// Record in speed (/s)
	speedPerMin = +((correctlyInputed / minutes).toFixed(1));	// Calculating char/minute speed
	if (speedPerMinMax < speedPerMin && seconds >= 60) { speedPerMinMax = speedPerMin; }		// Record in speed (/m)
	let waitMessage;
	if (lang == 'eng') waitMessage = 'wait...';		// messages than results are not ready to be shown
	if (lang == 'rus') waitMessage = 'ждите...';
	if (lang == 'ukr') waitMessage = 'чекайте...';

	if (seconds < 1) {
		document.getElementById('outSpeedPerSec').innerHTML = waitMessage;		// do not show NaN until 1 sec passed
		document.getElementById('outSpeedPerSecMax').innerHTML = waitMessage;
	}
	else { 
		document.getElementById('outSpeedPerSec').innerHTML = speedPerSec;			// output characters/second speed
		document.getElementById('outSpeedPerSecMax').innerHTML = speedPerSecMax; 	// output max characters/second speed
	}	
	if (seconds < 60) {
		document.getElementById('outSpeedPerMin').innerHTML = waitMessage;		// do not show NaN until 60 sec passed
		document.getElementById('outSpeedPerMinMax').innerHTML = waitMessage;
	}
	else {
		document.getElementById('outSpeedPerMin').innerHTML = speedPerMin;			// output characters/minute speed
		document.getElementById('outSpeedPerMinMax').innerHTML = speedPerMinMax; 	// output max characters/second speed
	}	
}


function keepFormChecked() {	// function that keep at least one checkbox checked (must be called every frame)

	let isChecked = false;	// is checkbox checked
    for (let i = 0; i < selectTextPack.length; i++) {	// all checkboxes in the form
        if ( selectTextPack[i].checked ) {	// if checked 
            isChecked = true;		// true
        }
    }
    if ( !isChecked ) {		// if there are not checked checkboxes
    	selectTextPack.selectEng.checked = true;	// check "English test" as default
    }   
}


function update() {		// Function called every frame (~60 calls/sec) (for the code that must be executed ~60 times/sec)
						//                                     (starts executing code after clicking Start button)
	printSpeed();		// Prints typing speed
	keepFormChecked();	// Keeps at least one Language packs checkbox checked (if all unchecked - checks English)
	colorButtons();		// Color diabled buttons in grey (fix for themes)
	document.getElementById('outMistakes').innerHTML = mistakes; // Print number of mistakes is html
	
	requestAnimationFrame(update); // Recursive call evey frame
}


function openSettings() {	// opens the Settings menu
	rules.classList.add("show");	// show the Settings
	settingsBtn.disabled = true;	// diable Settings button (to close user must click "Apply settings")
	document.getElementById('settingsBtn').style.color = 'grey';	// colorButtons() do not work for this button
}


function applySettings() {	// Executed than Apply Settings button is pressed

	// 1. Apply Language:

	if (document.getElementById('selectEngLang').checked) {		// call changeLanguage() depending on which language is chosen
		lang = 'eng';											// 										in the stettings menu
		changeLanguage();
	}
	if (document.getElementById('selectRusLang').checked) {
		lang = 'rus';	
		changeLanguage();
	}
	if (document.getElementById('selectUkrLang').checked) {
		lang = 'ukr';
		changeLanguage();
	}

	// 2. Language Packs updated automatically

	// 3. Apply Mode:

	if (document.getElementById('selectMode0').checked) {		// set mode to 0 ( green + black/white )
		outputMode = 0;
	}
	if (document.getElementById('selectMode1').checked) {		// set mode to 1 ( black/white )
		outputMode = 1;
	}
	
	// 4. Apply Font:

	if (document.getElementById('selectOpsans').checked) {		// updates font-family property of outText depenting on
		document.getElementById('outText').style.fontFamily = 'Open Sans'; // which font is chosen in the stettings menu
	}
	if (document.getElementById('selectTimes').checked) {
		document.getElementById('outText').style.fontFamily = 'Times New Roman';
	}
	if (document.getElementById('selectArial').checked) {
		document.getElementById('outText').style.fontFamily = 'Arial';
	}

	// 5. Apply Theme:

	if (document.getElementById('selectGreen').checked) {	// if Green theme chosen
		changeTheme('#1a1a1a', '#f0f5eb', '#e2ebda', '#d7e0ce', '#d7e0ce', 'white');	// call function, there arguments 
	}																					//    are colors of the theme chosen
	if (document.getElementById('selectPurple').checked) {	// if Purple theme chosen
		changeTheme('#1a1a1a', '#f3ebf5', '#e8daeb', '#dbcee0', '#dbcee0', 'white');
	}
	if (document.getElementById('selectGolden').checked) {	// if Golden theme chosen
		changeTheme('#1a1a1a', '#f5f4eb', '#ebe9da', '#e0dece', '#e0dece', 'white');
	}
	if (document.getElementById('selectGreenD').checked) {	// if Green dark theme chosen
		changeTheme('#f9fff2', '#31362c', '#404739', '#252920', '#252920', 'black');
	}
	if (document.getElementById('selectPurpleD').checked) {	// if Purple dark theme chosen
		changeTheme('#f9f2ff', '#342c36', '#453947', '#262029', '#262029', 'black');
	}
	if (document.getElementById('selectGoldenD').checked) {	// if Golden dark theme chosen
		changeTheme('#fffcf2', '#36332c', '#474339', '#292620', '#292620', 'black');
	}

	rules.classList.remove("show");	// hide settings menu after applying
	settingsBtn.disabled = false;	// enable Settings button

	drawOnCanvas(); // Redraw keyboard
}


function changeTheme(col1, col2, col3, col4, col5, col6) { // Changes theme, arguments are colors of the color scheme

		document.body.style.backgroundColor = col2;	// change property on id
		document.getElementById('outText').style.backgroundColor = col3; // change property on id
		document.getElementById('header').style.color = col1; // change properties on id
		document.getElementById('outText').style.color = col1;
		document.getElementById('outSource').style.color = col1;
		textColorOfTheme = col1;	// color that text uses in current theme
		if (!isStartup) { justPrintSlicedText(); }	// do if trainer already started
		else { document.getElementById('outText').innerHTML = '⠀'; } // do if trainer is not started yet

		let elementsOfClass = document.getElementsByClassName('rate'); // change properties of class "rate"
		for (let k = 0; k < elementsOfClass.length; k++) {	// cycle for all the elements of class
			elementsOfClass[k].style.color = col1;	// change text color
  			elementsOfClass[k].style.backgroundColor = col4;  // change background color
		}

		elementsOfClass = document.getElementsByClassName('btn'); // change properties of class "btn"
		for (let k = 0; k < elementsOfClass.length; k++) {
			elementsOfClass[k].style.color = col1;
  			elementsOfClass[k].style.background = col5;
		}

		colorOfTheme1 = col5;	// color of current theme needed outside this function
		colorOfTheme2 = col2;	// color of current theme needed outside this function
		colorOfTheme3 = col6;	// color of current theme needed outside this function

		colorButtons(); 														// fixing color of disabled buttons
		document.getElementById('settingsBtn').style.color = textColorOfTheme; 

		document.getElementById('canvas').style.background = colorOfTheme1;	// change canvas (keyboard) background color
}


function changeLanguage() {

	let p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15,	// Needed variables that contain single string
	p16,p17,p18,p19,p20,p21,p22,p23,p24,p25,p26,p27;

	if (lang == 'eng') {										// set variables to strings in english
		p1 = "Settings"; 			p14 = "Apply settings";
		p2 = "• Language"; 		 	p15 = "Keyboard Trainer";
		p3 = "• Language of text"; 	p16 = "Settings";
		p4 = "English text"; 		p17 = "Time";
		p5 = "Russian text"; 		p18 = "Mistakes";
		p6 = "Ukrainian text"; 		p19 = "char/sec";
		p7 = "• Mode"; 				p20 = "Max (c/s)";
		p8 = "• Font"; 				p21 = "char/min";
		p9 = "• Theme"; 			p22 = "Max (c/m)";
		p10 = "Green Light"; 		p23 = "Pause";
		p11 = "Purple Light"; 		p24 = "Reset";
		p12 = "Golden Light"; 		p25 = "Next text";
		p13 = "Dark"; 				p26 = "Start";
									p27 = "Resume";
	}
	if (lang == 'rus') {												// in russian
		p1 = "Настройки"; 			p14 = "Применить настройки";
		p2 = "• Язык"; 				p15 = "Клавиатурный тренажер";
		p3 = "• Языки текста"; 		p16 = "Настройки";
		p4 = "Английский текст"; 	p17 = "Время";
		p5 = "Русский текст"; 		p18 = "Ошибки";
		p6 = "Украинский текст"; 	p19 = "симв/сек";
		p7 = "• Режим"; 			p20 = "Макс (с/с)";
		p8 = "• Шрифт"; 			p21 = "симв/мин";
		p9 = "• Тема"; 				p22 = "Макс (c/м)";
		p10 = "Зеленая Свет."; 		p23 = "Пауза";
		p11 = "Пурпурная Свет."; 	p24 = "Сброс";
		p12 = "Золотая Свет."; 		p25 = "След. текст";
		p13 = "Тём."; 				p26 = "Старт";
									p27 = "Продолжить";
	}
	if (lang == 'ukr') {													// in ukrainian
		p1 = "Налаштування"; 		p14 = "Застосувати налаштування";
		p2 = "• Мова"; 				p15 = "Клавіатурний тренажер";
		p3 = "• Мови тесту"; 		p16 = "Налаштування";
		p4 = "Англійський текст"; 	p17 = "Час";
		p5 = "Російський текст"; 	p18 = "Помилки";
		p6 = "Український текст"; 	p19 = "симв/сек";
		p7 = "• Режим"; 			p20 = "Макс (c/с)";
		p8 = "• Шрифт"; 			p21 = "симв/хв";
		p9 = "• Тема"; 				p22 = "Макс (c/х)";
		p10 = "Зелена Світ."; 		p23 = "Пауза";
		p11 = "Пурпурна Світ."; 	p24 = "Cкинути";
		p12 = "Золота Світ."; 		p25 = "Наст. текст";
		p13 = "Тем."; 				p26 = "Старт";
									p27 = "Продовжити";
	}

	document.getElementById('p_settings').innerHTML = p1;	// Print in html strings translated before
	document.getElementById('p_language').innerHTML = p2;
	document.getElementById('p_langpacks').innerHTML = p3;
	document.getElementById('p_langPackEng').innerHTML = p4;
	document.getElementById('p_langPackRus').innerHTML = p5;
	document.getElementById('p_langPackUkr').innerHTML = p6;
	document.getElementById('p_mode').innerHTML = p7;
	document.getElementById('p_font').innerHTML = p8;
	document.getElementById('p_theme').innerHTML = p9;
	document.getElementById('p_themeGrL').innerHTML = p10;
	document.getElementById('p_themePuL').innerHTML = p11;
	document.getElementById('p_themeGoL').innerHTML = p12;
	document.getElementById('p_themeGrD').innerHTML = p13;
	document.getElementById('p_themePuD').innerHTML = p13;
	document.getElementById('p_themeGoD').innerHTML = p13;
	document.getElementById('close-btn').innerHTML = p14;
	document.getElementById('p_header').innerHTML = p15;
	document.getElementById('settingsBtn').value = p16; 
	document.getElementById('p_time').innerHTML = p17;
	document.getElementById('p_mistakes').innerHTML = p18;
	document.getElementById('p_c/s').innerHTML = p19;
	document.getElementById('p_maxc/s').innerHTML = p20;
	document.getElementById('p_c/m').innerHTML = p21;
	document.getElementById('p_maxc/m').innerHTML = p22;
	document.getElementById('pauseBtn').value = p23;
	document.getElementById('resetBtn').value = p24;
	document.getElementById('reloadBtn').value = p25;
	if ( isStartup || isRestart )startBtn.value = p26;		// "Start" if trainer not started or reset
	if ( !isStartup && !isRestart )startBtn.value = p27;	// "Resume" if trainer working
}


function colorButtons() {	// makes text of disabled buttons gray, enabled - normal color for current theme (black/ white)

	if (document.getElementById('settingsBtn').disabled) { document.getElementById('settingsBtn').style.color = 'grey'; }
	else { document.getElementById('settingsBtn').style.color = textColorOfTheme; }

	if (document.getElementById('startBtn').disabled) { document.getElementById('startBtn').style.color = 'grey'; }
	else { document.getElementById('startBtn').style.color = textColorOfTheme; }

	if (document.getElementById('pauseBtn').disabled) { document.getElementById('pauseBtn').style.color = 'grey'; }
	else { document.getElementById('pauseBtn').style.color = textColorOfTheme; }

	if (document.getElementById('resetBtn').disabled) { document.getElementById('resetBtn').style.color = 'grey'; }
	else { document.getElementById('resetBtn').style.color = textColorOfTheme; }

	if (document.getElementById('reloadBtn').disabled) { document.getElementById('reloadBtn').style.color = 'grey'; }
	else { document.getElementById('reloadBtn').style.color = textColorOfTheme; }
}



// KEYBOARD:


const canvas = document.getElementById('canvas');	// canvas constants
const ctx = canvas.getContext('2d');


let keyWidth = 50;			// preperties for keys of keyboard
let keyHeight = 50;
let isKeyPressed = false;


function addKeysProperties(keys, lineY, offsetX) {	// add those properties to every key in the line
													// arguments: keys - array of keys,
	for (let i = 0; i < keys.length; i++) {			//		  	  lineY - Y coordinate of the line of keys
													//			  offsetX - left offset
		keys[i].w = keyWidth;
		keys[i].h = keyHeight;
		keys[i].x = i * ( 50 + 6 ) + offsetX;
		keys[i].y = lineY;
		keys[i].color = colorOfTheme2;
		keys[i].pressed = isKeyPressed;
	}
}


addKeysProperties(keysLine1, 25, 16);	// calling the functions to add those preperties to each line
addKeysProperties(keysLine2, 80, 60);
addKeysProperties(keysLine3, 135, 90);
addKeysProperties(keysLine4, 190, 120);


function drawOnCanvas() {			// Render on canvas. Must be called every frame
	ctx.clearRect(0, 0, canvas.width, canvas.height);	// Clear canvas
	drawKeyboard(keysLine1, keysLine2, keysLine3, keysLine4);	// draw keyboard, arguments are lines of keys
}
drawOnCanvas();	// call this function to render keyboard on the start of the page


function drawKeyboard(keys1, keys2, keys3, keys4) {		//draws every line + space button
	drowKeyLine(keys1, 15);
	drowKeyLine(keys2, 21);
	drowKeyLine(keys3, 21);
	drowKeyLine(keys4, 21);
	drawSpaceKey();
}


function drowKeyLine(keys, offsetX) {		// drow a line of keys. Arguments: keys - array of keys, 
															//    offsetX - left offset of the line 
	for (let i = 0; i < keys.length; i++) {	// do every key

		ctx.beginPath();	// start drawing

    		ctx.rect(keys[i].x, keys[i].y, keys[i].w, keys[i].h);				// draw a rectangle
   		   	ctx.fillStyle = keys[i].pressed ? colorOfTheme3 : colorOfTheme2;	// set background color depending on current theme
    	  	ctx.fill();															// fill with color
    	  	ctx.fillStyle = textColorOfTheme;									// set text color depending on current theme
    	  	ctx.font = "16px Arial"; 											// set font of caption of the key
    	  	if (randPack == 0) ctx.fillText(keys[i].captionEng, keys[i].x+offsetX, keys[i].y+31);	// if english text needs to be inputed
    	  	if (randPack == 1) {																	// if ukrainian text needs to be inputed
    	  		if ('codeUkr' in keys[i]) { ctx.fillText(keys[i].captionUkr, keys[i].x+offsetX, keys[i].y+31); } // if key is defferent than russian (has own keycodes)
    	  		else { ctx.fillText(keys[i].captionRus, keys[i].x+offsetX, keys[i].y+31); }			// if key is the same with russian
    	  	}
			if (randPack == 2) ctx.fillText(keys[i].captionRus, keys[i].x+offsetX, keys[i].y+31);	// if russian text needs to be inputed

    	ctx.closePath();	// finish drawing
    }
}


function drawSpaceKey() {	// draws space key. Same as drowKeyLine(), but without cycle and caption

		ctx.beginPath();
	    	ctx.rect(keySpace.x, keySpace.y, keySpace.w, keySpace.h);
	   		ctx.fillStyle = keySpace.pressed ? colorOfTheme3 : colorOfTheme2;
	    	ctx.fill();
	    	ctx.fillStyle = textColorOfTheme;
	    ctx.closePath();
}


function checkPressedKeys() {	// function that checks ever button on state of "pressed" property based on last keycode inputed (keyCodePressed)

	if (randPack == 0) {	// if english text needs to be inputed

		for (let i = 0; i < keysLine1.length; i ++) {
	    	if (keysLine1[i].codeEng == keyCodePressed || keysLine1[i].codeEng1 == keyCodePressed) { keysLine1[i].pressed = true; }
	    	else { keysLine1[i].pressed = false; }
	    }

	    for (let i = 0; i < keysLine2.length; i ++) {
	    	if (keysLine2[i].codeEng == keyCodePressed || keysLine2[i].codeEng1 == keyCodePressed) { keysLine2[i].pressed = true; }
	    	else { keysLine2[i].pressed = false; }
	    }

	    for (let i = 0; i < keysLine3.length; i ++) {
	    	if (keysLine3[i].codeEng == keyCodePressed || keysLine3[i].codeEng1 == keyCodePressed) { keysLine3[i].pressed = true; }
	    	else { keysLine3[i].pressed = false; }
	    }

	    for (let i = 0; i < keysLine4.length; i ++) {
	    	if (keysLine4[i].codeEng == keyCodePressed || keysLine4[i].codeEng1 == keyCodePressed) { keysLine4[i].pressed = true; }
	    	else { keysLine4[i].pressed = false; }
	    }

	    if (keySpace.code == keyCodePressed) { keySpace.pressed = true; }
	    else { keySpace.pressed = false; }
	}

	if (randPack == 1) {	// if ukrainian text needs to be inputed
		
		for (let i = 0; i < keysLine1.length; i ++) {
	    	if ('codeUkr' in keysLine1[i]) { // if key is defferent than russian (has own keycodes)
		    	if (keysLine1[i].codeUkr == keyCodePressed || keysLine1[i].codeUkr1 == keyCodePressed) { keysLine1[i].pressed = true; }
		    	else { keysLine1[i].pressed = false; }
	    	} else {						// if key is the same with russian
	    		if (keysLine1[i].codeRus == keyCodePressed || keysLine1[i].codeRus1 == keyCodePressed) { keysLine1[i].pressed = true; }
		    	else { keysLine1[i].pressed = false; }
	    	}
	    }

	    for (let i = 0; i < keysLine2.length; i ++) {	
	    	if ('codeUkr' in keysLine2[i]) { // if key is defferent than russian (has own keycodes)
		    	if (keysLine2[i].codeUkr == keyCodePressed || keysLine2[i].codeUkr1 == keyCodePressed) { keysLine2[i].pressed = true; }
		    	else { keysLine2[i].pressed = false; }
	    	} else {						// if key is the same with russian
	    		if (keysLine2[i].codeRus == keyCodePressed || keysLine2[i].codeRus1 == keyCodePressed) { keysLine2[i].pressed = true; }
		    	else { keysLine2[i].pressed = false; }
	    	}
	    }

	    for (let i = 0; i < keysLine3.length; i ++) {
	    	if ('codeUkr' in keysLine3[i]) { // if key is defferent than russian (has own keycodes)
		    	if (keysLine3[i].codeUkr == keyCodePressed || keysLine3[i].codeUkr1 == keyCodePressed) { keysLine3[i].pressed = true; }
		    	else { keysLine3[i].pressed = false; }
	    	} else {						// if key is the same with russian
	    		if (keysLine3[i].codeRus == keyCodePressed || keysLine3[i].codeRus1 == keyCodePressed) { keysLine3[i].pressed = true; }
		    	else { keysLine3[i].pressed = false; }
	    	}
	    }

	    for (let i = 0; i < keysLine4.length; i ++) {
	    	if (keysLine4[i].codeRus == keyCodePressed || keysLine4[i].codeRus1 == keyCodePressed) { keysLine4[i].pressed = true; }
	    	else { keysLine4[i].pressed = false; }
	    }

	    if (keySpace.code == keyCodePressed) { keySpace.pressed = true; }
	    else { keySpace.pressed = false; }
	}

	if (randPack == 2) {			// if russian text needs to be inputed
		
		for (let i = 0; i < keysLine1.length; i ++) {
	    	if (keysLine1[i].codeRus == keyCodePressed || keysLine1[i].codeRus1 == keyCodePressed) { keysLine1[i].pressed = true; }
	    	else { keysLine1[i].pressed = false; }
	    }

	    for (let i = 0; i < keysLine2.length; i ++) {
	    	if (keysLine2[i].codeRus == keyCodePressed || keysLine2[i].codeRus1 == keyCodePressed) { keysLine2[i].pressed = true; }
	    	else { keysLine2[i].pressed = false; }
	    }

	    for (let i = 0; i < keysLine3.length; i ++) {
	    	if (keysLine3[i].codeRus == keyCodePressed || keysLine3[i].codeRus1 == keyCodePressed) { keysLine3[i].pressed = true; }
	    	else { keysLine3[i].pressed = false; }
	    }

	    for (let i = 0; i < keysLine4.length; i ++) {
	    	if (keysLine4[i].codeRus == keyCodePressed || keysLine4[i].codeRus1 == keyCodePressed) { keysLine4[i].pressed = true; }
	    	else { keysLine4[i].pressed = false; }
	    }

	    if (keySpace.code == keyCodePressed) { keySpace.pressed = true; }
	    else { keySpace.pressed = false; }
	}
}


let frames = 0;	// counter for frames after pressing a key

function updateKeyboard() {		// Function called every frame (~60 calls/sec) (starts executing code from the start of the page)

	drawOnCanvas(); 		// draw keyboard on canvas in html
	checkPressedKeys();		// check pressed buttons

	if (doCountFrames) {	// if a key pressed
		frames++;			// start counting frames
	}
	if (frames == 7) {			// after 7 frames
		keyCodePressed = 0;		// unpress all keys
		doCountFrames = false;	// do not count until next key pressed
		frames = 0;				// set frames to 0
	}

	requestAnimationFrame(updateKeyboard); // Recursive call evey frame
}
updateKeyboard();	// call the function on the start of the page