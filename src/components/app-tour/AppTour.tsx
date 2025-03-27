
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, PauseCircle, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { tourScript } from './tour-script';

export function AppTour() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(300); // 5 minutes in seconds
  const [elapsedTime, setElapsedTime] = useState(0);
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Create an audio element for text-to-speech playback
  useEffect(() => {
    audioRef.current = new Audio();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Timer functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            clearInterval(intervalRef.current!);
            return 0;
          }
          return prev - 1;
        });
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  // Speak the current step
  useEffect(() => {
    if (isPlaying && !isMuted) {
      speakText(tourScript[currentStep].narration);
    }
  }, [currentStep, isPlaying, isMuted]);

  // Navigate to the correct route for each step
  useEffect(() => {
    if (tourScript[currentStep]) {
      navigate(tourScript[currentStep].route);
    }
  }, [currentStep, navigate]);

  const speakText = (text: string) => {
    if (!isMuted && window.speechSynthesis) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create a new speech utterance
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Get available voices and select a good one
      const voices = window.speechSynthesis.getVoices();
      // Try to find a clear, natural-sounding voice
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google') || 
        voice.name.includes('Premium') || 
        voice.name.includes('Daniel')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      // Set speech parameters
      utterance.rate = 1.0; // Normal speed
      utterance.pitch = 1.0; // Normal pitch
      utterance.volume = 1.0; // Full volume
      
      // When speech ends, move to the next step if we're still playing
      utterance.onend = () => {
        if (isPlaying && currentStep < tourScript.length - 1) {
          setTimeout(() => {
            setCurrentStep(currentStep + 1);
          }, 1000); // Small pause between sections
        }
      };
      
      // Start speaking
      window.speechSynthesis.speak(utterance);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      window.speechSynthesis.pause();
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        speakText(tourScript[currentStep].narration);
      }
    }
  };

  const nextStep = () => {
    if (currentStep < tourScript.length - 1) {
      window.speechSynthesis.cancel();
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      window.speechSynthesis.cancel();
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      window.speechSynthesis.cancel();
    } else if (isPlaying) {
      speakText(tourScript[currentStep].narration);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = (elapsedTime / (elapsedTime + remainingTime)) * 100;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg"
    >
      <div className="bg-card rounded-lg shadow-lg border p-4 mx-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <Badge variant="outline" className="mr-2">Tour</Badge>
            <h3 className="font-medium">
              {currentStep + 1}/{tourScript.length}: {tourScript[currentStep].title}
            </h3>
          </div>
          <div className="text-sm text-muted-foreground">
            {formatTime(remainingTime)} remaining
          </div>
        </div>

        <div className="relative h-1 w-full bg-secondary mb-4 rounded-full overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {tourScript[currentStep].description}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevStep} 
              disabled={currentStep === 0}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button
              variant={isPlaying ? "destructive" : "default"}
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <PauseCircle className="h-4 w-4 mr-2" />
              ) : (
                <PlayCircle className="h-4 w-4 mr-2" />
              )}
              {isPlaying ? "Pause Tour" : "Play Tour"}
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextStep} 
              disabled={currentStep === tourScript.length - 1}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
