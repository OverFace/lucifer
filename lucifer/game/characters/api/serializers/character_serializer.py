from rest_framework import serializers
from game.characters.models import Character
from .status_serializer import StatusSerializer
from .inventory_serializer import InventorySerializer
from .learnedskill_serializer import LearnedSkillSerializer
from .quickslot_serializer import QuickSlotSerializer


class CharacterSerializer(serializers.ModelSerializer):

    status = StatusSerializer()
    inventory_set = InventorySerializer(many=True)
    learnedskill_set = LearnedSkillSerializer(many=True)
    quickslot_set = QuickSlotSerializer(many=True)

    class Meta:
        model = Character
        fields = (
                'nickname',
                'level',
                'job',
                'complete_quest_set',

                'status',
                'inventory_set',
                'learnedskill_set',
                'quickslot_set',
                )
