from rest_framework import serializers
from django.contrib.auth import authenticate
from api.animals.models import Animal
from api.animals.serializers import AnimalSerializer
from .models import User, UserLike
from .tokens import generate_access_token, generate_refresh_token

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    access = serializers.SerializerMethodField()
    refresh = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['name', 'surname', 'email', 'phone', 'password', 'access', 'refresh']

    def get_access(self, user):
        return generate_access_token(user)

    def get_refresh(self, user):
        return generate_refresh_token(user)

    def create(self, validated_data):
        user = User.objects.create_user(
            name=validated_data['name'],
            surname=validated_data.get('surname', ''),
            email=validated_data['email'],
            phone=validated_data.get('phone', ''),
            password=validated_data['password'],
        )
        return user

class LoginSerializer(serializers.Serializer):
    name = serializers.CharField(read_only=True)
    surname = serializers.CharField(read_only=True)
    phone = serializers.CharField(read_only=True)
    email = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)
    access = serializers.CharField(max_length=255, read_only=True)
    refresh = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        email = data.get('email', None)
        password = data.get('password', None)

        if email is None:
            raise serializers.ValidationError(
                'Потрібна пошта'
            )

        if password is None:
            raise serializers.ValidationError(
                'Потрібен пароль'
            )

        user = authenticate(username=email, password=password)

        if user is None:
            raise serializers.ValidationError(
                'Користувач не знайдений'
            )

        if not user.is_active:
            raise serializers.ValidationError(
                'Користувач деактивований'
            )

        return {
            'email': user.email,
            'name': user.name,
            'surname': user.surname,
            'phone': user.phone,
            'access': generate_access_token(user),
            'refresh': generate_refresh_token(user),
        }

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    class Meta:
        model = User
        fields = ('email', 'name', 'surname', 'phone', 'password')

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        for key, value in validated_data.items():
            setattr(instance, key, value)

        if password is not None:
            instance.set_password(password)

        instance.save()

        return instance


class UserPublicProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'name', 'surname', 'date')
        read_only_fields = fields
        

class UserLikeSerializer(serializers.ModelSerializer):
    animal = AnimalSerializer(read_only=True)
    animal_id = serializers.PrimaryKeyRelatedField(
        queryset=Animal.objects.all(),
        source="animal",
        write_only=True,
    )

    class Meta:
        model = UserLike
        fields = ['animal', 'animal_id', 'created_at']
        read_only_fields = ['animal', 'created_at']

    def validate(self, attrs):
        request = self.context.get("request")
        animal = attrs.get("animal")

        if request and animal:
            has_like = UserLike.objects.filter(
                user=request.user,
                animal=animal,
            ).exists()

            if has_like:
                raise serializers.ValidationError(
                    "Animal is already liked."
                )

        return attrs


