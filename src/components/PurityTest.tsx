import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const questions = [
  "Walked to Kins when you live in Jester?",
  "Shit on your friends at A&M?",
  "Partied on 6th?",
  "Used a fake on 6th?",
  "Stepped foot into Littlefield Fountain?",
  "Bought from Glassmith?",
  "Jumped in main fountain?",
  "Went to the food trucks on 26th?",
  "Called out by crossing guard on 24th?",
  "Had a HealthyHorns condom expire before use?",
  "Got a HealthyHorns condom?",
  "Reserved a PCL room just to watch a movie?",
  "Camped a study room (6+ hours)?",
  "Complained about GDC smell?",
  "Seen an albino squirrel before a test?",
  "All nighter in PCL?",
  "Did a Gig'em?",
  "Yapped with a homeless person on Guad?",
  "Went to top of PMA?",
  "Gone to top of UT Tower?",
  "Stolen a Speedway brick?",
  "Made out in the EER?",
  "Grocery shopped at Target?",
  "Had to use the \"lost and found\" bucket at a frat after a hookup/spending the night out?",
  "Been to a Zeta Psi party?",
  "Been to a TKE party?",
  "Been to 21st Street Co-op?",
  "Delayed getting a haircut until break because you only trust your barber from back home?",
  "Snuck into the Stadium?",
  "Snuck into top floor of Stadium?",
  "Found the tunnels?",
  "Been inside the Scientology Building?",
  "Taken a picture of the Balls of Texas?",
  "Gone up the Fiji stairs of consent?",
  "Gotten Jendy's while intoxicated?",
  "Been kissed in front of the Turtle Pond?",
  "Sang The Eyes of Texas at a home game?",
  "Hooked up off of YikYak?",
  "Been in Jester while it caught on fire/Had to evacuate Jester because of a fire?",
  "Scootered across campus?",
  "Went to Gone to Texas?",
  "Said 'Hook 'em' in a non-ironic way?",
  "Said \"what starts here changes the world\" non-ironically?",
  "Tried to sneak a friend into J2 without paying?",
  "Left Greg without working out because all the machines were full?",
  "Stressed about parking more than your classes?",
  "Had to explain the difference between UT and UTA?",
  "Been to the PCL Map room?",
  "Bulk purchased at Jester market to get rid of expiring Dine in dollars?",
  "Made an excuse to avoid tablers on Speedway?",
  "Had a PCL elevator shake or make sus sounds while you're in it?",
  "Saw a raccoon on campus?",
  "Visited Blanton Museum (it's free)?",
  "Studied in Battle Hall?",
  "Went bowling in the Union?",
  "Had a date in the Union?",
  "Gone to ACL?",
  "Used a Q drop?",
  "Been to Biological Sciences Greenhouses (BGH)?",
  "Been shushed on PCL quiet floors?",
  "Gone to Cain & Abel's on a Tuesday and gotten aggressively drunk off $1 beers?",
  "Witnessed a random kid put on a full piano concert on a random dorm piano?"
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
        Click on every item you have done.
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
