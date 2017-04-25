var debugCheck;

var stage1_Scene =
{
	/*
		STAGE1
		--마을 Stage--
	*/

	create: function()
	{
		//Sound
		sound_PlayStage1BGM();

		//Stage
		stageOne_Create();

		//Player
		player_Create();

		//Monster
		golem_Create();
		countess_Create();

		//Npc Create
		npc_Create();

		//Sight Effect
		sight_Filter_Create();

		//Quest
		QuestCreate();

        //items
        itemStoreCreate();

		//UI
		ui_Create();

		//Skill
		skill_Create();

		//Rain Particle
		rain_Create();

		//Key Go to Stage2
		debugCheck = false;
		var enterKey = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.F3);
		enterKey.onDown.add(debug_Rendering_Down, this);
		enterKey.onUp.add(debug_Rendering_Up, this);
	},

	update: function()
	{
		//Player Update
		player_Update();

		//Monster Update
		golem_Update();
		countess_Update();

        //items Update
		itemsStoreUpdate();

		//Ui Update
		ui_Update();

		//Quest Update
		QuestUpdate();

		//Skill
		skill_Update();

		//Npc
		npc_Update();

		//Portal
		portal_Check();

		if(Portal_Check == true)
		{
			sound_StopStage1BGM();
			this.goto_Stage2();
			Portal_Check = false;
		}
	},

	render: function()
	{
		if(debugCheck == true)
		{
			//Player Render
			player_Render();

			//Monster Render
			golem_Redner();
			countess_Render();

            //itemStoreRender
            itemStoreRender();

			//Npc
			npc_Debug_Render();

			//Skill
	        skill_Debug_Render();
		}
	},

	goto_Stage2: function()
	{
		stageOne_Check = false;

		Lucifer_Game.state.start('stage2_load');
	}
};

function debug_Rendering_Down()
{
	if(debugCheck == false)
	{
		debugCheck = true;
	}
}

function debug_Rendering_Up()
{
	if(debugCheck == true)
	{
		debugCheck = false;
	}
}
