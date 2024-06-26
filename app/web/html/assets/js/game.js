const baseURL = "http://localhost/StoryQuests";
const defaultImg =
  baseURL + "/app/web/html/assets/cache/ninja-town-slime-leather_armor.png";

var game_data;
var avatar_data;
var act_id = 0;
var max_act = 2;

function start_quest() {
  var chooseClass = document.getElementById("chooseClass");
  chooseClass.classList.remove("d-none");

  var status = document.getElementById("status");
  status.classList.add("d-none");

  var actionsBox = document.getElementById("actionsBox");
  actionsBox.classList.add("d-none");

  var mintBox = document.getElementById("mintBox");
  mintBox.classList.add("d-none");

  var imageBox = document.getElementById("imageBox");
  imageBox.classList.add("d-none");

  var output = document.getElementById("output");
  output.classList.add("d-none");

  var shareBox = document.getElementById("shareBox");
  shareBox.classList.add("d-none");

  var gameBox = document.getElementById("gameBox");
  gameBox.classList.remove("d-none");

  get_classes();
}

function get_classes() {
  var answerOption1 = document.getElementById("answerOption1");
  var answerOption2 = document.getElementById("answerOption2");
  var answerOption3 = document.getElementById("answerOption3");
  console.log("Get Classes");
  $.getJSON(baseURL + "/app/web/html/api/v1/get_classes.php", function (data) {
    answerOption1.innerHTML = data.result[0];
    answerOption2.innerHTML = data.result[1];
    answerOption3.innerHTML = data.result[2];
    answerOption1.value = data.result[0];
    answerOption2.value = data.result[1];
    answerOption3.value = data.result[2];
  });
}

function play_game(val) {
  var status = document.getElementById("status");
  status.classList.remove("d-none");
  var chooseClass = document.getElementById("chooseClass");
  chooseClass.classList.add("d-none");
  var output = document.getElementById("output");
  output.classList.remove("d-none");
  var imageHolder = document.getElementById("imageHolder");
  output.innerHTML = "Loading...";
  imageHolder.classList.remove("blurred");
  var actionsBox = document.getElementById("actionsBox");
  actionsBox.classList.remove("d-none");
  var mintBox = document.getElementById("mintBox");
  mintBox.classList.remove("d-none");

  $.getJSON(baseURL + "/app/web/html/api/v1/index.php", function (data) {
    act_id = 0;
    game_data = data;
    load_act();
  });
}

function next_act() {
  act_id++;
  load_act();
}

function load_act() {
  console.log(game_data);

  var imageBox = document.getElementById("imageBox");
  imageBox.classList.add("d-none");
  var imageHolder = document.getElementById("imageHolder");
  imageHolder.src = game_data.result[act_id].image;
  imageHolder.classList.remove("blurred");
  imageHolder.classList.add("blurred");

  var output = document.getElementById("output");
  output.innerHTML = "<h2>ACT " + (act_id + 1) + "</h2>";
  output.innerHTML +=
    "You ventured out to the " + game_data.result[act_id].environment + ".<br>";
  output.innerHTML +=
    "You encountered a " + game_data.result[act_id].encounters + "!<br>";
  output.innerHTML +=
    "You defeated the " +
    game_data.result[act_id].encounters +
    " and found a " +
    game_data.result[act_id].treasures +
    ".<br>";

  if (act_id >= max_act) {
    end_game();
  }
}

function end_game() {
  var output = document.getElementById("output");
  output.innerHTML += "<h3>QUEST COMPLETED</h3><br>";
  output.innerHTML +=
    '<button class="btn btn-lg btn-primary" onclick="show_share_screen()">Share Replay</button><br><br>';
  var actionsBox = document.getElementById("actionsBox");
  actionsBox.classList.add("d-none");
}

function show_share_screen() {
  var shareBox = document.getElementById("shareBox");
  shareBox.classList.remove("d-none");

  var gameBox = document.getElementById("gameBox");
  gameBox.classList.add("d-none");

  var replayContent = document.getElementById("replayContent");
  replayContent.innerHTML = "";

  var i = 0;
  game_data.result.forEach((element) => {
    i++;
    replayContent.innerHTML += "<h3>ACT " + i + "</h3>";
    replayContent.innerHTML +=
      avatar_data.name +
      " ventured into the " +
      element.environment +
      " and encountered a " +
      element.encounters +
      ".<br>";
    replayContent.innerHTML +=
      '<img src="' +
      element.image +
      '" class="img-fluid w-50 object-fit-contain" />';
  });
}

function avatar_creation(val) {
  var status = document.getElementById("status");
  status.classList.remove("d-none");

  var chooseClass = document.getElementById("chooseClass");
  chooseClass.classList.add("d-none");

  var statName = document.getElementById("stat_name");
  var statClass = document.getElementById("stat_class");
  var statLevel = document.getElementById("stat_level");
  var statHealth = document.getElementById("stat_health");
  var statMana = document.getElementById("stat_mana");
  var statStrength = document.getElementById("stat_strength");
  var statWisdom = document.getElementById("stat_wisdom");
  var statAgility = document.getElementById("stat_agility");
  var statLuck = document.getElementById("stat_luck");

  $.getJSON(
    baseURL + "/app/web/html/api/v1/get_avatar.php?class=" + val,
    function (data) {
      avatar_data = data.result;
      statName.innerText = avatar_data.name;
      statClass.innerText = avatar_data.class;
      statLevel.innerText = avatar_data.level;
      statHealth.innerText = avatar_data.health;
      statMana.innerText = avatar_data.mana;
      statStrength.innerText = avatar_data.strength;
      statWisdom.innerText = avatar_data.wisdom;
      statAgility.innerText = avatar_data.agility;
      statLuck.innerText = avatar_data.luck;

      play_game();
    }
  );
}

function generate_new_moment() {
  var url = "http://localhost:3000/generate_image?message=";
  var statClass = document.getElementById("stat_class");
  var message =
    statClass.innerText +
    " fighting " +
    game_data.result[act_id].encounters +
    " in " +
    game_data.result[act_id].environment;

  var imageHolder = document.getElementById("imageHolder");
  imageHolder.src = "assets/img/loading_image.jpg";
  imageHolder.classList.remove("blurred");

  var imageBox = document.getElementById("imageBox");
  imageBox.classList.remove("d-none");

  $("#loadingModal").modal("show");
  //return;
  $.getJSON(url + message, function (data) {
    imageHolder.src = data.url;
    imageHolder.classList.add("blurred");
    $("#loadingModal").modal("hide");
  });
}
