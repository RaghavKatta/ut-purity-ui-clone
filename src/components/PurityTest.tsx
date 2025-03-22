
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const questions = [
  "Held hands romantically?",
  "Been on a date?",
  "Been in a relationship?",
  "Danced without leaving room for Jesus?",
  "Kissed a non-family member?",
  "Kissed a non-family member on the lips?",
  "French kissed?",
  "French kissed in public?",
  "Kissed on the neck?",
  "Kissed horizontally?",
  "Given or received a hickey?",
  "Kissed or been kissed on the breast?",
  "Kissed someone below the belt?",
  "Kissed for more than two hours consecutively?",
  "Played a game involving stripping?",
  "Seen or been seen by another person in a sensual context?",
  "Masturbated?",
  "Masturbated to a picture or video?",
  "Masturbated while someone else was in the room?",
  "Been caught masturbating?",
  "Masturbated with an inanimate object?",
  "Seen or read pornographic material?",
  "Streaked?",
  "Seen or been seen by another person in a sensual context?",
  "Skinny dipped?",
  "Had or given oral sex?",
  "Had or given oral sex in a vehicle?",
  "Had or given oral sex in public?",
  "Had manual sex?",
  "Had manual sex in a vehicle?",
  "Had fingering?",
  "Had intercourse?",
  "Had intercourse in a vehicle?",
  "Had intercourse in public?",
  "Had intercourse without protection?",
  "Had intercourse with someone you had just met?",
  "Had anal sex?",
  "Had a threesome?",
  "Attended an orgy?",
  "Cheated on a significant other during a relationship?",
  "Purchased contraceptives?",
  "Engaged in bestiality?",
  "Performed for money?",
  "Been paid to take explicit photos?",
  "Contracted an STI?",
  "Used drugs (marijuana, cocaine, ecstasy, etc.)?",
  "Been sent to detention or been suspended?",
  "Vandalized property?",
  "Had the police called on you?",
  "Run from the police?",
];

const PurityTest: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(questions.length).fill(false));
  const [score, setScore] = useState<number>(100);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const { toast } = useToast();

  const handleCheck = (index: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
  };

  const calculateScore = () => {
    const checkedCount = checkedItems.filter(item => item).length;
    const newScore = Math.max(0, 100 - Math.round((checkedCount / questions.length) * 100));
    setScore(newScore);
    setShowScore(true);
    setIsAnimated(true);
  };

  useEffect(() => {
    if (showScore) {
      const timer = setTimeout(() => {
        setIsAnimated(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showScore]);

  const getScoreMessage = () => {
    if (score >= 95) return "You're practically a saint!";
    if (score >= 80) return "You're quite innocent.";
    if (score >= 70) return "You're mostly pure.";
    if (score >= 50) return "You've had some experiences.";
    if (score >= 30) return "You've been around the block.";
    if (score >= 10) return "You're quite experienced.";
    return "You're practically shameless!";
  };

  const handleShare = async () => {
    const shareData = {
      title: 'UT Purity Test',
      text: `I scored ${score}% on the UT Purity Test! ${getScoreMessage()} Take the test yourself:`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        toast({
          title: "Shared successfully",
          description: "Thanks for sharing the UT Purity Test!",
        });
      } catch (err) {
        console.error('Error sharing:', err);
        fallbackShare();
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    const shareText = `I scored ${score}% on the UT Purity Test! ${getScoreMessage()} Take the test yourself: ${window.location.href}`;
    
    try {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Link copied to clipboard",
        description: "Share the link with your friends!",
      });
    } catch (err) {
      console.error('Failed to copy:', err);
      toast({
        title: "Couldn't copy link",
        description: "Please try again or share manually",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="title-container relative mb-10 pt-3 pb-3">
        <h1 className="text-5xl font-title text-center leading-snug">
          <span className="official-text text-title-red">The Official</span> 
          <span className="inline-block ml-2">UT Purity Test</span>
        </h1>
      </div>

      <div className="text-center italic mb-4">Have you ever...</div>

      <div className="text-center mb-8">
        <p className="font-serif mb-4">
          The Purity Test has historically served as a segue from O-week to true college life at UT.
        </p>
        <p className="font-serif">
          It's a voluntary opportunity for O-week groups to bond, and for students to track the maturation
          of their experiences throughout college.
        </p>
      </div>

      <div className="text-center font-bold mb-8">
        Caution: This is not a bucket list. Completion of all items on this test will likely result in death.
      </div>

      <div className="text-center mb-8">
        Click on every item you have done. <span className="underline">MPS</span> stands for Member of the Preferred Sex.
      </div>

      <div className="grid grid-cols-1 gap-y-1 mb-10">
        {questions.map((question, index) => (
          <div key={index} className="purity-test-item">
            <input
              type="checkbox"
              id={`question-${index}`}
              className="purity-checkbox"
              checked={checkedItems[index]}
              onChange={() => handleCheck(index)}
            />
            <label htmlFor={`question-${index}`} className="font-serif">
              {index + 1}. {question}
            </label>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={calculateScore}
          className="bg-title-red text-white py-2 px-6 rounded-md hover:bg-red-800 transition-colors mb-4"
        >
          Calculate My Score
        </button>

        {showScore && (
          <div className="mt-4">
            <h2 className={cn("text-3xl font-bold mb-2", isAnimated ? "animate-fadeIn" : "")}>
              Your Purity Score: {score}%
            </h2>
            <p className="text-lg mb-6">{getScoreMessage()}</p>
            
            <Button 
              onClick={handleShare} 
              className="flex items-center gap-2 mx-auto bg-title-red hover:bg-red-800 text-white"
            >
              <Share2 size={18} />
              Share My Score
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurityTest;
