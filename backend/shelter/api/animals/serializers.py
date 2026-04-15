from rest_framework import serializers
from .models import Animal


class AnimalSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    characters = serializers.StringRelatedField(many=True)
    animal_type = serializers.StringRelatedField()

    class Meta:
        model = Animal
        fields = [
            "id",
            "name",
            "age",
            "gender",
            "size",
            "description",
            "image_url",
            "is_adopted",
            "animal_type",
            "characters",
        ]

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None
