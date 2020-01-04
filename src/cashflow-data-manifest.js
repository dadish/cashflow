const menifest = [
  // data
  { id: "vocabEnUS", src: "assets/data/vocab_en_us.json", type: "json" },
  { id: "careers", src: "assets/data/careers.json", type: "json" },

  { id: "smallDeal", src: "assets/data/smalldeal.json", type: "json" },
  { id: "bigDeal", src: "assets/data/bigdeal.json", type: "json" },
  { id: "doodads", src: "assets/data/doodads.json", type: "json" },
  { id: "market", src: "assets/data/market.json", type: "json" },
  { id: "fastTrack", src: "assets/data/fasttrack.json", type: "json" },

  // templates
  {
    id: "cardTemplate",
    src: "assets/data/templates/card_template.json",
    type: "json"
  },
  {
    id: "dreamSelectorScreen",
    src: "assets/data/templates/dream_selector_screen.json",
    type: "json"
  },
  {
    id: "endGameWidget",
    src: "assets/data/templates/end_game_widget.json",
    type: "json"
  },
  {
    id: "gameScreen",
    src: "assets/data/templates/game_screen.json",
    type: "json"
  },
  {
    id: "lobbyScreen",
    src: "assets/data/templates/lobby_screen.json",
    type: "json"
  },
  {
    id: "modeSelectScreen",
    src: "assets/data/templates/mode_select_screen.json",
    type: "json"
  },
  {
    id: "partySetupScreen",
    src: "assets/data/templates/party_setup_screen.json",
    type: "json"
  },
  {
    id: "playerHeader",
    src: "assets/data/templates/player_header.json",
    type: "json"
  },
  {
    id: "splashScreen",
    src: "assets/data/templates/splash_screen.json",
    type: "json"
  },
  {
    id: "statementSheetTemplate",
    src: "assets/data/templates/statement_sheet_template.json",
    type: "json"
  },
  {
    id: "titleScreen",
    src: "assets/data/templates/title_screen.json",
    type: "json"
  },

  // // spritesheets
  {
    id: "titleImage",
    src: "assets/img/loadingscreen.json",
    isSpritesheet: "true",
    type: "json"
  },
  {
    id: "dice",
    src: "assets/img/dice.json",
    isSpritesheet: "true",
    type: "json"
  },
  {
    id: "board",
    src: "assets/img/board.json",
    isSpritesheet: "true",
    type: "json"
  },
  {
    id: "background",
    src: "assets/img/background_01.json",
    isSpritesheet: "true",
    type: "json"
  },
  {
    id: "statement",
    src: "assets/img/statement.json",
    isSpritesheet: "true",
    type: "json"
  },
  { id: "ui", src: "assets/img/ui.json", isSpritesheet: "true", type: "json" },
  {
    id: "fastTrackSheet",
    src: "assets/img/fasttrack.json",
    isSpritesheet: "true",
    type: "json"
  },
  {
    id: "ui2",
    src: "assets/img/ui2.json",
    type: "json",
    isSpritesheet: "true"
  },
  {
    id: "chat",
    src: "assets/img/chat.json",
    type: "json",
    isSpritesheet: "true"
  },

  // fonts
  {
    id: "grantAvenue",
    src: "assets/fonts/GrantAvenue-Regular.otf",
    type: "font"
  },

  //sound
  { id: "babyLand", src: "assets/audio/baby_land.mp3", type: "mp3" },
  {
    id: "bidDealSmallDeal",
    src: "assets/audio/bigdeal_smalldeal.mp3",
    type: "mp3"
  },
  { id: "botToOpen", src: "assets/audio/bot_to_open.mp3", type: "mp3" },
  { id: "buttonPush", src: "assets/audio/button_push.mp3", type: "mp3" },
  {
    id: "cashFlowDayLandv1",
    src: "assets/audio/cashflow_day_land_v1.mp3",
    type: "mp3"
  },
  {
    id: "cashFlowDayLandv2",
    src: "assets/audio/cashflow_day_land_v2.mp3",
    type: "mp3"
  },
  { id: "charityLand", src: "assets/audio/charity_land.mp3", type: "mp3" },
  { id: "diceRoll", src: "assets/audio/dice_roll.mp3", type: "mp3" },
  { id: "divorceLand", src: "assets/audio/divorce_land.mp3", type: "mp3" },
  { id: "doodaLand", src: "assets/audio/doodad_land.mp3", type: "mp3" },
  { id: "downsizedLand", src: "assets/audio/downsized_land.mp3", type: "mp3" },
  {
    id: "financialStatementsIn",
    src: "assets/audio/financial_statments_in.mp3",
    type: "mp3"
  },
  {
    id: "financialStatementsOut",
    src: "assets/audio/financial_statments_out.mp3",
    type: "mp3"
  },
  { id: "humanToBot", src: "assets/audio/human_to_bot.mp3", type: "mp3" },
  { id: "lawsuitLand", src: "assets/audio/lawsuit_land.mp3", type: "mp3" },
  {
    id: "leaveRatRaceEnterFastTrack",
    src: "assets/audio/leave_rat_race_enter_fast_track.mp3",
    type: "mp3"
  },
  { id: "marketLand", src: "assets/audio/market_land.mp3", type: "mp3" },
  { id: "nextPlayer", src: "assets/audio/next_player.mp3", type: "mp3" },
  { id: "online", src: "assets/audio/online.mp3", type: "mp3" },
  {
    id: "openToHumanv1",
    src: "assets/audio/open_to_human_v1.mp3",
    type: "mp3"
  },
  {
    id: "openToHumanv2",
    src: "assets/audio/open_to_human_v2.mp3",
    type: "mp3"
  },
  { id: "passAndPlayer", src: "assets/audio/pass_and_play.mp3", type: "mp3" },
  { id: "paydayLand", src: "assets/audio/payday_land.mp3", type: "mp3" },
  {
    id: "pieceMovementv1",
    src: "assets/audio/piece_movement_v1.mp3",
    type: "mp3"
  },
  {
    id: "pieceMovementv2",
    src: "assets/audio/piece_movement_v2.mp3",
    type: "mp3"
  },
  {
    id: "pieceMovementv3",
    src: "assets/audio/piece_movement_v3.mp3",
    type: "mp3"
  },
  { id: "pressToBegin", src: "assets/audio/press_to_begin.mp3", type: "mp3" },
  { id: "taxAuditLand", src: "assets/audio/tax_audit_land.mp3", type: "mp3" }
];
