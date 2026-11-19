const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const resultDisplay = document.getElementById('result');

const swimmers = [
    { element: document.getElementById('swimmer1'), nameKm: 'កីឡាការនី ឡូយ គីមមួយ', nameEn: 'Swimmer Loy Kimmuoy', pos: 40 },
    { element: document.getElementById('swimmer2'), nameKm: 'កីឡាករ ណាក់', nameEn: 'Swimmer Nak', pos: 40 },
    { element: document.getElementById('swimmer3'), nameKm: 'កីឡាករ ដំ', nameEn: 'Swimmer Dom', pos: 40 },
    { element: document.getElementById('swimmer4'), nameKm: 'កីឡាករ គោ', nameEn: 'Swimmer Kuo', pos: 40 },
    { element: document.getElementById('swimmer5'), nameKm: 'កីឡាករ ឡែន', nameEn: 'Swimmer Len', pos: 40 },
    { element: document.getElementById('swimmer6'), nameKm: 'កីឡាការនី ធន នីមុី', nameEn: 'Swimmer Thorn Nymoy', pos: 40 },
    { element: document.getElementById('swimmer7'), nameKm: 'កីឡាការនី ស្រី ចាន់', nameEn: 'Swimmer Srey Chan', pos: 40 },
    { element: document.getElementById('swimmer8'), nameKm: 'កីឡាការនី ហួកាំង ថារ័ត្ន', nameEn: 'Swimmer Huokaing Tharoat', pos: 40 },
    { element: document.getElementById('swimmer9'), nameKm: 'កីឡាករ សេង ឆាត', nameEn: 'Swimmer Seng Chhat', pos: 40 },
    { element: document.getElementById('swimmer10'), nameKm: 'កូនកំលោះ ហួកាំង ថារ៉ា', nameEn: 'Groom Huokaing Thara', pos: 40 },
    { element: document.getElementById('swimmer11'), nameKm: 'កូនក្រមុំ ខេន លីដា', nameEn: 'Bride Khen Lyda', pos: 40 },
    { element: document.getElementById('swimmer12'), nameKm: 'កីឡាការនី សម្បិត្ត ឡុងនី', nameEn: 'Swimmer Sambath Longny', pos: 40 },
    { element: document.getElementById('swimmer13'), nameKm: 'កីឡាករ សម្បិត្ត លីហាង', nameEn: 'Swimmer Sambath Lyhang', pos: 40 },
    { element: document.getElementById('swimmer14'), nameKm: 'កីឡាការនី ហួ សុខលីម', nameEn: 'Swimmer Huo Soklim', pos: 40 },
    { element: document.getElementById('swimmer15'), nameKm: 'កីឡាករ ហួ តុងហាំង', nameEn: 'Swimmer Huo Tonghang', pos: 40 },
    { element: document.getElementById('swimmer16'), nameKm: 'កីឡាការនី តន ចាន់សីម៉ា', nameEn: 'Swimmer Ton Chanseyma', pos: 40 },
    { element: document.getElementById('swimmer17'), nameKm: 'កីឡាករ សម្បិត្ត លីហ័រ', nameEn: 'Swimmer Sambath Lyhor', pos: 40 },
    { element: document.getElementById('swimmer18'), nameKm: 'កីឡាករ ឡេង ណាវ៉ាត់ត្រា', nameEn: 'Swimmer Leng Navatra', pos: 40 },
    { element: document.getElementById('swimmer19'), nameKm: 'កីឡាករ សុខ ខេមរ៉ា', nameEn: 'Swimmer Sok Khemara', pos: 40 },
    { element: document.getElementById('swimmer20'), nameKm: 'កីឡាករ N/A', nameEn: 'Swimmer N/A', pos: 40 }
];

let raceInterval;
let isRacing = false;

function startRace() {
    if (isRacing) return; // បើកំពុងប្រណាំង មិនឱ្យចុចដដែលៗទេ (Prevent duplicate clicks while racing)
    isRacing = true;
    startBtn.disabled = true;
    resultDisplay.innerHTML = `កំពុងប្រជែងគ្នាយ៉ាងស្វិតស្វាញ... 🏊‍♂️💨<br><small style="font-family: 'Poppins', sans-serif;">Racing fiercely toward the finish line...</small>`;

    // ទទឹងអាងសរុប ដកទំហំរូបអ្នកហែលទឹក និងខ្សែទីព្រ័ត្រ (Total lane width minus swimmer & finish line offset)
    const finishPos = document.querySelector('.lane').offsetWidth - 90;

    raceInterval = setInterval(() => {
        let winnersKm = [];
        let winnersEn = [];

        swimmers.forEach(swimmer => {
            // បន្ថែមល្បឿនចៃដន្យពី ១ ទៅ ៧ ក្នុងមួយវគ្គ (Random speed increment per tick)
            const speed = Math.random() * 6 + 1;
            swimmer.pos += speed;
            if (swimmer.element) {
                swimmer.element.style.left = swimmer.pos + 'px';
            }

            // ពិនិត្យមើលថាអ្នកណាដល់ទីព្រ័ត្រមុន (Check who crossed the finish line)
            if (swimmer.pos >= finishPos) {
                winnersKm.push(swimmer.nameKm);
                winnersEn.push(swimmer.nameEn);
            }
        });

        // បើសិនជាមានអ្នកដល់ទីព្រ័ត្រ (If one or more swimmers finish)
        if (winnersKm.length > 0) {
            clearInterval(raceInterval);
            isRacing = false;
            startBtn.disabled = false;

            // បង្ហាញអ្នកឈ្នះជាពីរភាសា (Display winners in Khmer & English)
            resultDisplay.innerHTML = `🏆 លទ្ធផល៖ ${winnersKm.join(' និង ')} បានឈ្នះការប្រកួត! 🥇<br><small style="font-family: 'Poppins', sans-serif;">Result: ${winnersEn.join(' and ')} won the race!</small>`;
        }
    }, 50); // រត់រៀងរាល់ 0.05 វិនាទី (Runs every 0.05 seconds)
}

function resetRace() {
    clearInterval(raceInterval);
    isRacing = false;
    startBtn.disabled = false;
    resultDisplay.innerHTML = `សូមចុចប៊ូតុងដើម្បីចាប់ផ្តើម!<br><small style="font-family: 'Poppins', sans-serif;">Click the start button to begin!</small>`;

    // នាំកីឡាករត្រឡប់ទៅចំណុចចាប់ផ្តើមវិញ (Reset all swimmers back to starting line)
    swimmers.forEach(swimmer => {
        swimmer.pos = 40;
        if (swimmer.element) {
            swimmer.element.style.left = '40px';
        }
    });
}

// ភ្ជាប់ព្រឹត្តិការណ៍ចុច (Click Events)
startBtn.addEventListener('click', startRace);
resetBtn.addEventListener('click', resetRace);
