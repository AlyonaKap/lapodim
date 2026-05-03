from rest_framework import serializers
from .models import Animal, Adoption, Character

MAX_OPEN_ADOPTIONS_PER_USER = 10
LIMITED_ADOPTION_STATUSES = ["pending", "rejected"]


def has_reached_limited_adoption_count(user, exclude_adoption_id=None):
    queryset = Adoption.objects.filter(
        user=user,
        status__in=LIMITED_ADOPTION_STATUSES,
    )

    if exclude_adoption_id is not None:
        queryset = queryset.exclude(pk=exclude_adoption_id)

    return queryset.count() >= MAX_OPEN_ADOPTIONS_PER_USER


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


class CharacterSerializer(serializers.ModelSerializer):
    character_type = serializers.CharField(source="name")

    class Meta:
        model = Character
        fields = ["id", "character_type"]
    
class AdoptionSerializer(serializers.ModelSerializer):
    animal = AnimalSerializer(read_only=True)
    animal_id = serializers.PrimaryKeyRelatedField(
        queryset=Animal.objects.all(),
        source="animal",
        write_only=True,
    )

    class Meta:
        model = Adoption
        fields = [
            "id",
            "animal",
            "animal_id",
            "status",
            "created_at"
        ]
        read_only_fields = ["id", "animal", "status", "created_at"]

    def validate(self, attrs):
        request = self.context.get("request")
        animal = attrs.get("animal")

        if request:
            if has_reached_limited_adoption_count(request.user):
                raise serializers.ValidationError(
                    "Adoption request limit reached."
                )

        if request and animal:
            has_adoption = Adoption.objects.filter(
                user=request.user,
                animal=animal,
            ).exists()

            if has_adoption:
                raise serializers.ValidationError(
                    "У вас вже є активна заявка на цю тварину"
                )

        return attrs


class AdoptionStatusUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Adoption
        fields = ["status"]

    def validate(self, attrs):
        status = attrs.get("status")

        if (
            status in LIMITED_ADOPTION_STATUSES
            and has_reached_limited_adoption_count(
                self.instance.user,
                exclude_adoption_id=self.instance.pk,
            )
        ):
            raise serializers.ValidationError(
                "Adoption request limit reached."
            )

        return attrs
