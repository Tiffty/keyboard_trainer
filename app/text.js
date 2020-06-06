
/*
  Sources:

https://bookriot.com/2018/07/18/short-inspirational-quotes/
https://znoclub.com/mova-ta-literatura/1086-20-tsitat-ukrajinskikh-pismennikiv.html
http://www.rozumnadytyna.com.ua/?p=7516
https://www.askbooka.ru/quotation/russkaya-literatura.html

*/

// Each array contains text of one language

// English text

let textEng = [   // array of objects with 2 propeties: source of text (autor) and text itself
  {
    'source': 'Oscar Wilde',
    'text': "Be yourself; everyone else is already taken",
  },
  {
    'source': 'Dr. Seuss',
    'text': "You know you're in love when you can't fall asleep because reality is finally better than your dreams",
  },
  {
    'source': 'Mark Twain',
    'text': "If you tell the truth, you don't have to remember anything",
  },
  {
    'source': 'Vento Aureo, Hirohiko Araki',
    'text': "You will never reach the truth. No one who stand before me shall ever do so. This is... REQUIEM",
  },
  {
    'source': 'The Minpins, Roald Dahl',
    'text': "Those who don't believe in magic will never find it",
  },
  {
    'source': 'Autumn Leaves, André Gide',
    'text': "It is better to be hated for what you are than to be loved for what you are not",
  },
  {
    'source': 'Shatter Me, Tahereh Mafi',
    'text': "Sometimes weak and wan, sometimes strong and full of light. The moon understands what it means to be human",
  },
  {
    'source': 'Peter Pan, J.M. Barrie',
    'text': "The moment you doubt whether you can fly, you cease forever to be able to do it",
  },
  {
    'source': 'Phrynette Married, Marthe Troly-Curtin',
    'text': "Time you enjoy wasting is not wasted time",
  },
  {
    'source': 'Furthermore, Tahereh Mafi',
    'text': "She decided long ago that life was a long journey. She would be strong, and she would be weak, and both would be okay",
  },
  {
    'source': 'The Little Prince, Antoine de Saint-Exupéry',
    'text': "One sees clearly only with the heart. Anything essential is invisible to the eyes",
  },
  {
    'source': 'The Unabridged Journals of Sylvia Plath, Sylvia Plath',
    'text': "The worst enemy to creativity is self-doubt",
  },
  {
    'source': 'I Know Why the Caged Bird Sings, Maya Angelou',
    'text': "Hoping for the best, prepared for the worst, and unsurprised by anything in between",
  },
  {
    'source': 'An Autobiography, Agatha Christie',
    'text': "It is a curious thought, but it is only when you see people looking ridiculous that you realize just how much you love them",
  },
  {
    'source': 'East of Eden, John Steinbeck',
    'text': "And, now that you don't have to be perfect you can be good",
  },
  {
    'source': 'Being Mortal, Atul Gawande',
    'text': "We all require devotion to something more than ourselves for our lives to be endurable",
  },
  {
    'source': 'Steel Ball Run, Hirohiko Araki',
    'text': "The shortest way was always a detour",
  },
  {
    'source': 'The Truth About Forever, Sarah Dessen',
    'text': "There is never a time or place for true love. It happens accidentally, in a heartbeat, in a single flashing, throbbing moment",
  },
  {
    'source': 'Les Misérables, Victor Hugo',
    'text': "Even the darkest night will end and the sun will rise",
  },
  {
    'source': 'Just Mercy, Bryan Stevenson',
    'text': "Each of us is more than the worst thing we've ever done",
  },
  {
    'source': 'Ballet Shoes, Noel Streatfeild',
    'text': "It was all very well to be ambitious, but ambition should not kill the nice qualities in you",
  },
  {
    'source': 'The Two Towers, J.R.R. Tolkien',
    'text': "There is some good in this world, and it's worth fighting for",
  },
]



// Ukrainian text

let textUkr = [
  {
    'source': 'Ліна Костенко',
    'text': "Людям не те що позакладало вуха - людям позакладало душі",
  },
  {
    'source': 'Василь Симоненко',
    'text': "Найпрекрасніша мати щаслива, найсолодші кохані вуста, найчистіша душа незрадлива, найскладніша людина проста",
  },
  {
    'source': 'Олександр Олесь',
    'text': "В обіймах з радістю журба. Одна летить, друга спиня... І йде між ними боротьба, і дужчий хто - не знаю я...",
  },
  {
    'source': 'Іван Багряний',
    'text': "Ліпше вмерти біжучи, ніж жити гниючи",
  },
  {
    'source': 'Іван Багряний',
    'text': "Людина - це найвеличніша з усіх істот. Людина - найнещасніша з усіх істот. Людина - найпідліша з усіх істот. Як тяжко з цих трьох рубрик вибирати першу для доведення прикладом",
  },
  {
    'source': 'Остап Вишня',
    'text': "Письменник не так живе й не так росте, як проста собі людина. Що проста людина? Живе собі, поживе собі, помре собі. А письменник - ні",
  },
  {
    'source': 'Григорій Тютюнник',
    'text': "Мрія дає нуль, якщо її не зробити життям",
  },
  {
    'source': 'Володимир Винниченко',
    'text': "Нема любові без ненависті, як нема білого без чорного! Хочете любові, то мусите ненавидіти",
  },
  {
    'source': 'Г. Коваль',
    'text': "Людина в світ зерно нести повинна, як зерно носить людям колосок",
  },
  {
    'source': 'Олесь Гончар',
    'text': "Чого варті наші тамерлани та наполеони без коня?",
  },
  {
    'source': 'Григорій Сковорода',
    'text': "Світ ловив мене, та не спіймав",
  },
  {
    'source': 'Іван Нехода',
    'text': "Вічна слава безсмертю хоробрих, які кличуть на подвиг живих!",
  },
  {
    'source': 'Іван Величковський',
    'text': "Магнат, як магніт, кожен добре знає: сей залізо, а той золото притягає",
  },
  {
    'source': 'Іван Величковський',
    'text': "У вбогого трохи є, в жебрака нічого. Понад міру в богача, а досить - ні в кого",
  },
  {
    'source': 'М. Стельмах',
    'text': "Як не буде птахів, то і людське серце стане черствішим",
  },
  {
    'source': 'В. Терен',
    'text': "Життя не кінчається смертю, якщо залишається сад",
  },
  {
    'source': 'В. Симоненко',
    'text': "Найпрекрасніша мати щаслива, найсолодші кохані вуста, найчистіша душа незрадлива, найскладніша людина проста",
  },
  {
    'source': 'М. Стельмах',
    'text': "Хочу, щоб ніколи, ніколи не зачерствіло серце",
  },
  {
    'source': 'М. Рильський',
    'text': "Ми працю любимо, що в творчість перейшла",
  },
  {
    'source': 'Іван Франко',
    'text': "Добру науку приймай, хоч її від простого чуєш; злої ж на ум не бери, хоч би й святий говорив",
  },
  {
    'source': 'В. Симоненко',
    'text': "Можна вибрати друга і по духу брата, та не можна рідну матір вибирати",
  },
  {
    'source': 'В.Симоненко',
    'text': "Праця людини - окраса і слава, праця людини - безсмертя її",
  },
  {
    'source': 'Д. Павличко',
    'text': "Не жди ніколи слушної пори - твоя мовчанка може стать ганьбою!",
  },
]



// Russian text

let textRus = [
  {
    'source': 'Михаил Салтыков-Щедрин «Господа Головлёвы»',
    'text': "Бывают семьи, над которыми тяготеет как бы обязательное предопределение, особливо это замечается в среде той мелкой дворянской сошки",
  },
  {
    'source': 'Михаил Салтыков-Щедрин «Господа Головлёвы»',
    'text': "Пошлость имеет громадную силу; она всегда застанет свежего человека врасплох",
  },
  {
    'source': 'Михаил Салтыков-Щедрин «Господа Головлёвы»',
    'text': "Будущее, безнадёжное и безвыходное, однажды блеснувшее его уму и наполнившее его трепетом, с каждым днём всё больше и больше заволакивалось туманом и, наконец, совсем перестало",
  },
  {
    'source': 'Михаил Салтыков-Щедрин «Господа Головлёвы»',
    'text': "Потянулся ряд вялых, безобразных дней, один за другим утопающих в серой, зияющей бездне времени",
  },
  {
    'source': 'Иосиф Бродский «Собрание стихотворений»',
    'text': "Отсутствие есть всего лишь домашний адрес небытия",
  },
  {
    'source': 'Иосиф Бродский «Собрание стихотворений»',
    'text': "Квартплата резко подскакивает. Мало того, что нужно жить, ежемесячно надо ещё и платить за это",
  },
  {
    'source': 'Иосиф Бродский «Собрание стихотворений»',
    'text': "Коснуться тебя - коснуться астрономической суммы клеток, цена которой всегда - судьба, но которой лишь нежность пропорциональна",
  },
  {
    'source': 'Александр Пушкин «Собрание стихотворений»',
    'text': "В молчании добро должно твориться",
  },
  {
    'source': 'Александр Пушкин «Сказка о золотом петушке»',
    'text': "Сказка ложь, да в ней намёк! Добрым молодцам урок",
  },
  {
    'source': 'Венедикт Ерофеев «Благовествование»',
    'text': "Худшая из дурных привычек - решаться на подвиг, в котором больше вежливости, чем сострадания",
  },
  {
    'source': 'Иосиф Бродский «Собрание стихотворений»',
    'text': "Любовь сильней разлуки, но разлука длинней любви",
  },
  {
    'source': 'Иосиф Бродский «Собрание стихотворений»',
    'text': "На прощанье - ни звука",
  },
  {
    'source': 'Михаил Лермонтов «Собрание стихотворений»',
    'text': "Смешались в кучу кони, люди",
  },
  {
    'source': 'Александр Пушкин «Евгений Онегин»',
    'text': "Иных уж нет, а те далече",
  },
  {
    'source': 'Иосиф Бродский «Собрание стихотворений»',
    'text': "Одиночество учит сути вещей, ибо суть их то же одиночество",
  },
  {
    'source': 'Сергей Довлатов «Филиал»',
    'text': "У нас есть свобода и молодость. А свобода плюс молодость вроде бы и называется любовью",
  },
  {
    'source': 'Дон-Аминадо «Отнюдь не мелочь»',
    'text': "Нехорошо, когда вино ударяет в голову вместе с бутылкой",
  },
  {
    'source': 'Дон-Аминадо «Отнюдь не мелочь»',
    'text': "Преступник, убеждённый в безнаказанности, в конце концов, страдает за свои убеждения",
  },
  {
    'source': 'Дон-Аминадо «Отнюдь не мелочь»',
    'text': "Очарование начинается с главного, разочарование - с пустяков",
  },
  {
    'source': 'Дон-Аминадо «Отнюдь не мелочь»',
    'text': "Приличный человек если и совершит свинство, то молча",
  },
  {
    'source': 'Дон-Аминадо «Отнюдь не мелочь»',
    'text': "Убеждённая свинья без подходящей литературной цитаты никак уж не обойдётся",
  },
  {
    'source': 'Дон-Аминадо «Отнюдь не мелочь»',
    'text': "Если вам окончательно нечего делать, отчего вам не сделаться душой общества?!",
  },
  {
    'source': 'Дон-Аминадо «Отнюдь не мелочь»',
    'text': "Если долго поступать по-свински, то в конце концов можно устроиться по-человечески",
  },
  {
    'source': 'Дон-Аминадо «Отнюдь не мелочь»',
    'text': "Если бы мы знали всё, что о нас будут говорить, когда нас не будет, нас бы уже давно не было",
  },
  {
    'source': 'Дон-Аминадо «Отнюдь не мелочь»',
    'text': "Улыбайтесь на всякий случай, случай всегда найдётся",
  },
  {
    'source': 'Дон-Аминадо «Отнюдь не мелочь»',
    'text': "Выходя из себя, не забудьте вернуться!",
  },
  {
    'source': 'Лев Толстой «Война и мир»',
    'text': "В доме Ростовых было невесело",
  },
  {
    'source': 'Андрей Вознесенский «Собрание стихотворений»',
    'text': "Если боли людей сближают, то на чёрта мне жизнь без боли?",
  },
]