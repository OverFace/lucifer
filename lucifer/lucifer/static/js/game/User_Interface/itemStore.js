var potionSprite,
    swordSprite,
    armorSprite,
    uiStore,
    selectedItem = null,
    invenKeyTimer,
    invenKeyValidCheck = 1;

//itemStore font style
var itemStoreStyle = {
    font: "15px Courier", fill: "#fff", 
};

//potion 객체를 만들때 사용
potion = function (game, positionX, positionY, spriteKey, heal, limited_job, itemStoreStyle){
    Phaser.Sprite.call(this, game, positionX, positionY, spriteKey);

    //item status
    //name = spritekey name
    this.name = spriteKey;
    this.type_is = 'potion';
    this.heal = heal;
    this.limited_job = limited_job;

    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(0.5, 0.5);
    this.fixedToCamera = true;
    this.visible = false;
    var itemData = [
        [ itemList[0].name ],
        [ '' ],
        [ '      ', itemList[0].price ],
    ];

    parsedItemData = parseList(itemData);
    itemText = parsedItemData.text;

    this.text = game.add.text(positionX + 45, positionY - 20, itemText, itemStoreStyle);
    this.text.fixedToCamera = true;
    this.text.visible = false;
}

potion.prototype = Object.create(Phaser.Sprite.prototype);
potion.prototype.getVisible = function(bool){
    this.visible = bool;
    this.text.visible = bool;
}
potion.prototype.constructor = potion;

//sword 객체를 만들때 사용 
sword = function (game, positionX, positionY, spriteKey, attack_point, limited_job, itemText, itemStoreStyle){
    Phaser.Sprite.call(this, game, positionX, positionY, spriteKey);

    //item status
    //name = spritekey name
    this.name = spriteKey;
    this.type_is = 'sword';
    this.attack_point = attack_point;
    this.limited_job = limited_job;

    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(0.5, 0.5);
    this.fixedToCamera = true;
    this.visible = false;

    this.text = game.add.text(positionX + 45, positionY - 20, itemText, itemStoreStyle);
    this.text.fixedToCamera = true;
    this.text.visible = false;
}

sword.prototype = Object.create(Phaser.Sprite.prototype);
sword.prototype.getVisible = function(bool){
    this.visible = bool;
    this.text.visible = bool;
}
sword.prototype.constructor = sword;

//armor 객체를 만들때 사용 
armor = function (game, positionX, positionY, spriteKey, defence_point, limited_job, itemText, itemStoreStyle){
    Phaser.Sprite.call(this, game, positionX, positionY, spriteKey);
    
    //item status
    //name == spritekey name
    this.name = spriteKey;
    this.type_is = 'shield';
    this.defence_point = defence_point;
    this.limited_job = limited_job;

    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(0.5, 0.5);
    this.fixedToCamera = true;
    this.visible = false;

    this.text = game.add.text(positionX + 45, positionY - 20, itemText, itemStoreStyle);
    this.text.fixedToCamera = true;
    this.text.visible = false;
}

armor.prototype = Object.create(Phaser.Sprite.prototype);
armor.prototype.getVisible = function(bool){
    this.visible = bool;
    this.text.visible = bool;
}
armor.prototype.constructor = armor;

function itemsPreload(){

    Lucifer_Game.load.spritesheet(itemList[0].name, '../../static/images/game/item/'+ itemList[0].image_name + '.png', 150, 150);
    Lucifer_Game.load.spritesheet(itemList[1].name, '../../static/images/game/item/'+ itemList[1].image_name + '.png', 150, 150);
    Lucifer_Game.load.spritesheet(itemList[2].name, '../../static/images/game/item/'+ itemList[2].image_name + '.png', 150, 150);
    Lucifer_Game.load.spritesheet('uiStore', '../../static/images/game/UI/store/store.png', 455, 684);
    Lucifer_Game.load.spritesheet('potionTab', '../../static/images/game/UI/store/PotionTab.png', 45, 80);
    Lucifer_Game.load.spritesheet('swordTab', '../../static/images/game/UI/store/swordTab.png', 45, 80);
    Lucifer_Game.load.spritesheet('armorTab', '../../static/images/game/UI/store/armorTab.png', 45, 80);
    Lucifer_Game.load.spritesheet('saleTab', '../../static/images/game/UI/store/sale.png', 45, 80);
    Lucifer_Game.load.spritesheet('inven', '../../static/images/game/UI/Inventory/inventory.png', 354, 716);


};

function itemsCreate(){

    //Tab 이미지 추가
    //--------------------------------------------------------

    //itemStore-----------------------------------------------
    //--------------------------------------------------------
    potionTab = Lucifer_Game.add.sprite(446, 100, 'potionTab');
    potionTab.anchor.setTo(0.5, 0.5);
    potionTab.scale.setTo(1.5, 1.5);
    potionTab.fixedToCamera = true;
    potionTab.visible = false;

    potionTab.inputEnabled = true;
    potionTab.events.onInputDown.add(potionStoreTab ,this);

    swordTab = Lucifer_Game.add.sprite(446, 200, 'swordTab');
    swordTab.anchor.setTo(0.5, 0.5);
    swordTab.scale.setTo(1.2, 1.2);
    swordTab.fixedToCamera = true; swordTab.visible = false; swordTab.alpha = 0.7;

    swordTab.inputEnabled = true;
    swordTab.events.onInputDown.add(swordStoreTab ,this);

    armorTab = Lucifer_Game.add.sprite(446, 295, 'armorTab');
    armorTab.anchor.setTo(0.5, 0.5);
    armorTab.scale.setTo(1.2, 1.2);
    armorTab.fixedToCamera = true;
    armorTab.visible = false;
    armorTab.alpha = 0.7;

    armorTab.inputEnabled = true;
    armorTab.events.onInputDown.add(armorStoreTab ,this);

    saleTab = Lucifer_Game.add.sprite(445, 400, 'saleTab');
    saleTab.anchor.setTo(0.5, 0.5);
    saleTab.scale.setTo(1.2, 1.2);
    saleTab.fixedToCamera = true;
    saleTab.visible = false;
    saleTab.alpha = 0.7;

    saleTab.inputEnabled = true;
    saleTab.events.onInputDown.add(buyItem, this);

    uiStore = Lucifer_Game.add.sprite(228, 330, 'uiStore');
    uiStore.anchor.setTo(0.5, 0.5); 
    uiStore.scale.setTo(0.9, 0.9);
    uiStore.fixedToCamera = true;
    uiStore.visible = false;
    //--------------------------------------------------------
    //--------------------------------------------------------

    //inventory-----------------------------------------------
    //--------------------------------------------------------
    uiInventory = Lucifer_Game.add.sprite(445, 300, 'inven');
    uiInventory.anchor.setTo(0.5, 0.5);
    uiInventory.scale.setTo(0.8, 0.8);
    uiInventory.fixedToCamera = true;
    uiInventory.visible = false;

    //inventory key setting -----------------------------------------
    key_inven = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.E);

    invenKeyTimer = Lucifer_Game.time.create(false);
    invenKeyTimer.loop(400, invenTimeCheck, this);
    //---------------------------------------------------------------

    //itemStore font style
    var style = {
        font : "32px Courier",
        fill: "#00ff44",
        wordWrapWidth: 100,
    };

    

    //Postion -----------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------
   
    redPotion = new potion(Lucifer_Game, 55, 105, itemList[0].name, itemList[0].heal, itemList[0].limited_job, itemStoreStyle);

    //input Rect ----------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------
    
    Lucifer_Game.physics.p2.enable(redPotion);
    redPotion.body.clearShapes();
    redPotion.body.addRectangle();
    redPotion.body.static = true;

    redPotion.inputEnabled = true;
    redPotion.events.onInputDown.add(clickItem, this);

    //--------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------

    //draw rect ----------------------------------------------------------------------------
    Lucifer_Game.add.existing(redPotion);

    //---------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------

    //Sword--------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------
    var itemData = [
        [ itemList[1].name ],
        [ '' ],
        [ '      ', itemList[1].price ],
    ];

    parsedItemData = parseList(itemData);
    itemText = parsedItemData.text;

    basicSword = new sword(Lucifer_Game, 55, 105, itemList[1].name, itemList[1].attack_point, itemList[2].limited_job, itemText, itemStoreStyle);
    
    //input Rect ----------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------
    Lucifer_Game.physics.p2.enable(basicSword); 
    basicSword.body.addRectangle(0, 0);
    basicSword.body.static = true;

    basicSword.inputEnabled = true;
    basicSword.events.onInputDown.add(clickItem, this);
    //--------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------

    Lucifer_Game.add.existing(basicSword);
    //----------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------

    
    //Armor--------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------
    var itemData = [
        [ itemList[2].name ],
        [ '' ],
        [ '      ', itemList[2].price ],
    ]
    parsedItemData = parseList(itemData);
    itemText = parsedItemData.text;

    basicArmor = new armor(Lucifer_Game, 55, 105, itemList[2].name, itemList[2].defence_point, itemList[2].limited_job, itemText, itemStoreStyle);

    Lucifer_Game.physics.p2.enable(basicArmor); 
    basicArmor.body.addRectangle(0, 0);
    basicArmor.body.static = true;

    basicArmor.inputEnabled = true;
    basicArmor.events.onInputDown.add(clickItem, this);

    Lucifer_Game.add.existing(basicArmor);
    //---------------------------------------------------------------------------------------   
    //---------------------------------------------------------------------------------------   

    invenArrayLength = inventory.length;
    for(i=0; i<invenArrayLength; i++){
        switch(inventory[i].item_name){
            case '빨간물약':
                inventory[i]=redPotionClone(200, 300, itemStoreStyle);
                break;
            case '기본검':
                inventory[i]=basicSword;
                break;
            case '기본갑옷':
                inventory[i]=basicArmor;
                break;
        };
    }
}

function itemsUpdate(){
    if(key_inven.isDown){
        invenKeyTimer.start();
        if(invenKeyValidCheck == 1){
            invenUi();
        }
        invenKeyValidCheck = 0;
    }
}

function showStore(){
    if(uiStore.visible === true){
        potionTab.visible = false;
        swordTab.visible = false;
        armorTab.visible = false;
        saleTab.visible = false;
        redPotion.getVisible(false);
        basicSword.getVisible(false);
        basicArmor.getVisible(false);
        uiStore.visible = false;
    }else{
        potionTab.visible = true;
        swordTab.visible = true;
        armorTab.visible = true;
        saleTab.visible = true;
        redPotion.getVisible(true);
        uiStore.visible = true;
    }
}

//클릭 시 실행
function potionStoreTab(){
    potionTab.alpha = 1;
    swordTab.alpha = 0.7;
    armorTab.alpha = 0.7;
    redPotion.getVisible(true);
    basicSword.getVisible(false);
    basicArmor.getVisible(false);
}

function swordStoreTab(){
    potionTab.alpha = 0.7;
    swordTab.alpha = 1;
    armorTab.alpha = 0.7;
    redPotion.getVisible(false);
    basicSword.getVisible(true);
    basicArmor.getVisible(false);
}

function armorStoreTab(){
    potionTab.alpha = 0.7;
    swordTab.alpha = 0.7;
    armorTab.alpha = 1;
    redPotion.getVisible(false);
    basicSword.getVisible(false);
    basicArmor.getVisible(true);
}

function clickItem(sprite){
    selectedItem = sprite;
}

function buyItem() {
    if(selectedItem === null){
        alert("먼저 구매할 물건을 클릭하세요");
    }else{
        alert("구매한 물건 : " + selectedItem.name);
        switch (selectedItem.name){
            case '빨간물약':
                selectedItem=redPotionClone(55, 105);
                break;
            case '기본검':
                inventory[i]=basicSword;
                break;
            case '기본갑옷':
                inventory[i]=basicArmor;
                break;
        }
        inventory.push(selectedItem);
        inventoryPost(selectedItem.name);
    }
}

function redPotionClone(positionX, positionY, itemStoreStyle){
    //potion 클래스 = game / x좌표 / y좌표 / spriteKey / heal / 직업 / 폰트 스타일 /
    redPotionObject = new potion(
        Lucifer_Game, positionX, positionY, itemList[0].name, itemList[0].heal, itemList[0].limited_job, itemStoreStyle
        );
    redPotionObject.text.setText(redPotionObject.name);
    redPotionObject.text.fontSize = 15; 
    redPotionObject.text.fill = '#fff';
    return redPotionObject;
}

function inventoryPost(selectedItem){
    $.ajax({
        method:'POST',
        url:'/api/user/character/inventory/',
        data:{
            character:character.nickname,
            selectedItem:selectedItem,
        },
    })
}

function invenTimeCheck(){
    invenKeyValidCheck = 1;
}

function invenUi(){
    if(uiInventory.visible === true){
        uiInventory.visible = false;
        inventory[0].getVisible(false);
    }else{
        uiInventory.visible = true;
        inventory[0].getVisible(true);
    }
}

function itemStoreRender(){
}
