from rest_framework import serializers
from .models import AdsPost

class AdsPostTextSerializer(serializers.ModelSerializer):
    
    brandname = serializers.CharField(allow_blank=True, required=False)
    hashtag = serializers.CharField(allow_blank=True, required=False)
    description = serializers.CharField(allow_blank=True, required=False)
    link = serializers.URLField(allow_blank=True, required=False)

    class Meta:
        model = AdsPost
        fields = '__all__'  # Include all fields from the model

    def create(self, validated_data):
        text = validated_data.pop('text')
        instance = super().create(validated_data)
        instance.text = text
        instance.save()
        return instance

class AdsPostImageSerializer(serializers.ModelSerializer):
    
    brandname = serializers.CharField(allow_blank=True, required=False)
    hashtag = serializers.CharField(allow_blank=True, required=False)
    description = serializers.CharField(allow_blank=True, required=False)
    link = serializers.URLField(allow_blank=True, required=False)
    
    class Meta:
        model = AdsPost
        fields = '__all__'  # Include all fields from the model

    def create(self, validated_data):
        image = validated_data.pop('image')
        if image:
            instance = super().create(validated_data)
            instance.image = image
            instance.save()
            return instance
        
class AdsPostVideoSerializer(serializers.ModelSerializer):
    
    brandname = serializers.CharField(allow_blank=True, required=False)
    hashtag = serializers.CharField(allow_blank=True, required=False)
    description = serializers.CharField(allow_blank=True, required=False)
    link = serializers.URLField(allow_blank=True, required=False)

    video = serializers.FileField(write_only=True)

    class Meta:
        model = AdsPost
        fields = '__all__'  # Include all fields from the model

    def create(self, validated_data):
        video = validated_data.pop('video')
        instance = super().create(validated_data)
        instance.video = video
        instance.save()
        return instance

class AdsPostAudioSerializer(serializers.ModelSerializer):
    
    brandname = serializers.CharField(allow_blank=True, required=False)
    hashtag = serializers.CharField(allow_blank=True, required=False)
    description = serializers.CharField(allow_blank=True, required=False)
    link = serializers.URLField(allow_blank=True, required=False)

    audio = serializers.FileField(write_only=True)

    class Meta:
        model = AdsPost
        fields = '__all__'  # Include all fields from the model

    def create(self, validated_data):
        audio = validated_data.pop('audio')
        instance = super().create(validated_data)
        instance.audio = audio
        instance.save()
        return instance