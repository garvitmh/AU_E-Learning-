import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { Card, Button } from '../components/shared';
import { Lock, Trophy, BookOpen } from 'lucide-react';

export default function QuizView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchQuiz = async () => {
      try {
        const res = await api.quiz.getByCourseId(id as string);
        if (res.success) {
          setQuiz(res.data);
        } else {
          setError(res.error || 'Failed to fetch quiz');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'You must be enrolled to take this quiz.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id, isAuthenticated, navigate]);

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < quiz?.questions?.length) {
      if (!window.confirm('You have unanswered questions. Submit anyway?')) return;
    }

    setSubmitting(true);
    try {
      const formattedAnswers = Object.entries(answers).map(([qId, idx]) => ({
        questionId: qId,
        selectedOptionIndex: idx
      }));

      const res = await api.quiz.submitAttempt(id as string, formattedAnswers);
      if (res.success) {
        setResult(res.data);
      } else {
        alert(res.error || 'Failed to submit quiz');
      }
    } catch (err) {
      alert('Error submitting quiz');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-[70vh] flex justify-center items-center"><span className="loading loading-spinner text-primary loading-lg"></span></div>;
  if (error || !quiz) return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center gap-4 text-center px-4">
      <div className="text-primary mb-2"><Lock className="w-16 h-16"/></div>
      <h2 className="text-2xl font-bold">{error || 'Quiz unavailable'}</h2>
      <Link to={`/courses/${id}`} className="btn btn-primary">Return to Course</Link>
    </div>
  );

  if (result) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Card className="shadow-2xl overflow-hidden border-2 border-base-300">
          <div className={`p-8 text-center text-white ${result.passed ? 'bg-success' : 'bg-error'}`}>
            <div className="flex justify-center mb-4">
              {result.passed ? <Trophy className="w-16 h-16" /> : <BookOpen className="w-16 h-16" />}
            </div>
            <h1 className="text-3xl font-extrabold">{result.passed ? 'Congratulations!' : 'Keep Learning!'}</h1>
            <p className="mt-2 text-lg opacity-90">{result.passed ? 'You passed the final exam.' : 'You did not meet the passing score this time.'}</p>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-2 gap-6 mb-8 text-center">
              <div className="bg-base-200 p-6 rounded-xl border border-base-300">
                <div className="text-sm font-bold text-base-content/60 uppercase tracking-wider mb-2">Your Score</div>
                <div className={`text-5xl font-extrabold ${result.passed ? 'text-success' : 'text-error'}`}>{result.score}%</div>
              </div>
              <div className="bg-base-200 p-6 rounded-xl border border-base-300">
                <div className="text-sm font-bold text-base-content/60 uppercase tracking-wider mb-2">Performance</div>
                <div className="text-3xl font-bold mt-2">{result.correctCount} / {result.totalQuestions}</div>
                <div className="text-sm text-base-content/60 mt-1">Correct Answers</div>
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
               {!result.passed && (
                 <Button variant="primary" onClick={() => window.location.reload()}>Retake Test</Button>
               )}
               <Link to="/dashboard" className="btn btn-outline">Go to Dashboard</Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link to={`/courses/${id}`} className="text-primary font-semibold hover:underline flex items-center gap-1 mb-4">
           ← Back to Course
        </Link>
        <h1 className="text-3xl font-extrabold">{quiz.title}</h1>
        <p className="text-base-content/70 mt-2">To pass, you must score at least {quiz.passingScore}%. Answer all {quiz.questions.length} questions below.</p>
      </div>

      <div className="space-y-8">
        {quiz.questions.map((q: any, i: number) => (
          <Card key={q._id} className="shadow-sm border border-base-200">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4"><span className="text-primary mr-2">Q{i + 1}.</span> {q.questionText}</h3>
              <div className="space-y-3">
                {q.options.map((opt: string, optIdx: number) => (
                  <label 
                    key={optIdx} 
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      answers[q._id] === optIdx 
                        ? 'border-primary bg-primary/5' 
                        : 'border-base-200 hover:border-base-300 bg-base-100'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name={`q-${q._id}`} 
                      className="radio radio-primary radio-sm mt-0.5"
                      checked={answers[q._id] === optIdx}
                      onChange={() => handleOptionSelect(q._id, optIdx)}
                    />
                    <span className="font-medium text-base-content/90">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-base-300 pt-6">
        <div className="text-sm font-semibold text-base-content/60">
          Answered: {Object.keys(answers).length} / {quiz.questions.length}
        </div>
        <Button 
          variant="primary" 
          onClick={handleSubmit} 
          disabled={submitting}
          className="px-10 shadow-lg text-lg"
        >
          {submitting ? <span className="loading loading-spinner"></span> : 'Submit Test'}
        </Button>
      </div>
    </div>
  );
}
