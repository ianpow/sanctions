import { useState, useCallback } from 'react'

/* ------------------------------------------------------------------ */
/*  Quiz data                                                          */
/* ------------------------------------------------------------------ */

interface Question {
  id: number
  category: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

const questions: Question[] = [
  // --- Fundamentals ---
  {
    id: 1,
    category: 'What Are Sanctions?',
    question: 'What is the primary purpose of economic sanctions?',
    options: [
      'To punish countries for trading with competitors',
      'To change behaviour by restricting economic activity',
      'To increase tax revenue for the sanctioning country',
      'To prevent all international trade',
    ],
    correctIndex: 1,
    explanation:
      'Sanctions are tools used by governments and international bodies to change behaviour — whether that\'s stopping human rights abuses, nuclear proliferation, or military aggression — by restricting economic activity with the target.',
  },
  {
    id: 2,
    category: 'What Are Sanctions?',
    question: 'Which of the following is NOT a common type of sanction?',
    options: [
      'Asset freeze',
      'Travel ban',
      'Increasing import tariffs',
      'Arms embargo',
    ],
    correctIndex: 2,
    explanation:
      'Tariffs are trade policy tools, not sanctions. Common sanctions include asset freezes, travel bans, arms embargoes, trade restrictions, and financial restrictions.',
  },

  // --- Who Imposes ---
  {
    id: 3,
    category: 'Who Imposes Sanctions?',
    question: 'Which UK body is responsible for implementing and enforcing financial sanctions?',
    options: [
      'The Bank of England',
      'The Financial Conduct Authority (FCA)',
      'The Office of Financial Sanctions Implementation (OFSI)',
      'HM Revenue & Customs (HMRC)',
    ],
    correctIndex: 2,
    explanation:
      'OFSI, part of HM Treasury, is responsible for implementing and enforcing financial sanctions in the UK. They maintain the UK sanctions list and can impose monetary penalties for breaches.',
  },
  {
    id: 4,
    category: 'Who Imposes Sanctions?',
    question: 'What does OFAC stand for?',
    options: [
      'Office of Foreign Asset Compliance',
      'Office of Financial Actions and Controls',
      'Office of Foreign Assets Control',
      'Organisation for Foreign Affairs Cooperation',
    ],
    correctIndex: 2,
    explanation:
      'OFAC — the Office of Foreign Assets Control — is part of the US Department of the Treasury. It administers and enforces US economic and trade sanctions.',
  },
  {
    id: 5,
    category: 'Who Imposes Sanctions?',
    question: 'Why does Chase bank in Edinburgh need to comply with BOTH UK and US sanctions?',
    options: [
      'Because Edinburgh is close to the US',
      'Because Chase is owned by JP Morgan, a US parent company',
      'Because the EU requires it',
      'Because all UK banks must follow US law',
    ],
    correctIndex: 1,
    explanation:
      'Chase in Edinburgh must comply with UK sanctions (as a UK-operating entity) AND US sanctions (because its parent company JP Morgan Chase is a US institution). This dual compliance requirement is common for international banks.',
  },

  // --- Types ---
  {
    id: 6,
    category: 'Types of Sanctions',
    question: 'What is an "asset freeze" in the context of sanctions?',
    options: [
      'Physically freezing someone\'s bank cards',
      'Preventing a designated person from accessing or moving their funds and economic resources',
      'Reducing the interest rate on accounts',
      'Converting all assets to a frozen currency',
    ],
    correctIndex: 1,
    explanation:
      'An asset freeze means that a designated person\'s funds and economic resources are frozen — they cannot access, move, or deal with them. Banks must identify and freeze any assets they hold for designated persons.',
  },
  {
    id: 7,
    category: 'Types of Sanctions',
    question: 'What is the difference between "comprehensive" and "targeted" sanctions?',
    options: [
      'Comprehensive are more expensive to enforce',
      'Comprehensive restrict nearly all economic activity with a country; targeted focus on specific individuals or entities',
      'Targeted sanctions are stronger than comprehensive',
      'There is no real difference',
    ],
    correctIndex: 1,
    explanation:
      'Comprehensive sanctions are broad, restricting most economic activity with an entire country (e.g., North Korea). Targeted sanctions focus on specific named individuals, companies, or sectors, aiming to minimise impact on ordinary citizens.',
  },

  // --- Key Lists ---
  {
    id: 8,
    category: 'The Key Lists',
    question: 'What is the SDN List?',
    options: [
      'A list of countries with diplomatic relations',
      'The Specially Designated Nationals and Blocked Persons List maintained by OFAC',
      'A list of safe banking destinations',
      'The Standard Delivery Network for international transfers',
    ],
    correctIndex: 1,
    explanation:
      'The SDN (Specially Designated Nationals and Blocked Persons) List is OFAC\'s primary sanctions list. US persons are prohibited from dealing with anyone on this list, and their assets must be blocked.',
  },
  {
    id: 9,
    category: 'The Key Lists',
    question: 'Approximately how many entries are on the US OFAC SDN list?',
    options: [
      'Around 2,000',
      'Around 15,000',
      'Around 69,000',
      'Around 500,000',
    ],
    correctIndex: 2,
    explanation:
      'The OFAC SDN list contains approximately 69,000 entries, making it one of the largest sanctions lists in the world. This includes individuals, companies, vessels, and aircraft.',
  },

  // --- How Banks Use Them ---
  {
    id: 10,
    category: 'How Banks Screen',
    question: 'At which stage of the customer relationship do banks first screen for sanctions?',
    options: [
      'Only when a suspicious transaction occurs',
      'At onboarding (account opening)',
      'Only during the annual review',
      'Only when regulators request it',
    ],
    correctIndex: 1,
    explanation:
      'Banks screen at onboarding (before opening an account), then continuously during the relationship — every transaction is screened, and the full customer base is re-screened when sanctions lists are updated.',
  },
  {
    id: 11,
    category: 'How Banks Screen',
    question: 'What happens when a bank\'s screening system generates a "hit"?',
    options: [
      'The customer\'s account is immediately closed',
      'The police are called',
      'An alert is created for a human analyst to investigate whether it\'s a true or false match',
      'The transaction is automatically reported to OFSI',
    ],
    correctIndex: 2,
    explanation:
      'A screening "hit" generates an alert that goes to a sanctions analyst for investigation. Most hits are false positives (e.g., someone with a similar name). The analyst determines if it\'s a true match before any action is taken.',
  },
  {
    id: 12,
    category: 'How Banks Screen',
    question: 'What was the approximate fine that BNP Paribas received for sanctions violations?',
    options: [
      '$50 million',
      '$500 million',
      '$8.9 billion',
      '$100 billion',
    ],
    correctIndex: 2,
    explanation:
      'BNP Paribas was fined approximately $8.9 billion in 2014 for processing transactions through the US financial system on behalf of sanctioned countries including Sudan, Iran, and Cuba. It remains one of the largest sanctions fines ever.',
  },

  // --- Screening Process ---
  {
    id: 13,
    category: 'The Screening Process',
    question: 'What is "fuzzy matching" in sanctions screening?',
    options: [
      'Matching names that are exactly the same',
      'An algorithm that finds similar names accounting for spelling variations, transliterations, and typos',
      'Matching based on physical appearance',
      'Randomly selecting names to check',
    ],
    correctIndex: 1,
    explanation:
      'Fuzzy matching algorithms find names that are similar but not identical — crucial for sanctions screening because names can be transliterated differently from Arabic, Russian, Chinese etc., or may have common spelling variations.',
  },
  {
    id: 14,
    category: 'The Screening Process',
    question: 'Why do sanctions screening systems produce many false positives?',
    options: [
      'Because the systems are broken',
      'Because common names match many people, and fuzzy matching catches near-misses deliberately',
      'Because banks want to block as many transactions as possible',
      'Because regulators require a minimum number of alerts',
    ],
    correctIndex: 1,
    explanation:
      'False positives are expected and intentional to an extent — it\'s better to over-flag and investigate than to miss a true match. Common names like "Mohammed Ali" or "John Smith" will naturally match many non-sanctioned people.',
  },

  // --- Roles ---
  {
    id: 15,
    category: 'Roles in Sanctions',
    question: 'What does a sanctions screening analyst primarily do?',
    options: [
      'Write sanctions legislation',
      'Investigate alerts generated by screening systems to determine if they are true or false matches',
      'Arrest people who violate sanctions',
      'Set interest rates for sanctioned countries',
    ],
    correctIndex: 1,
    explanation:
      'Screening analysts review alerts from automated systems. They compare the flagged name against the sanctions list entry, checking identifiers like date of birth, nationality, and address to determine if it\'s the same person or a false positive.',
  },
  {
    id: 16,
    category: 'Roles in Sanctions',
    question: 'What does KYC stand for?',
    options: [
      'Keep Your Cash',
      'Know Your Customer',
      'Key Yearly Compliance',
      'Knowledge of Your Counterpart',
    ],
    correctIndex: 1,
    explanation:
      'KYC — Know Your Customer — is the process of verifying a customer\'s identity and assessing their risk profile. It\'s a fundamental part of anti-money laundering and sanctions compliance, performed at onboarding and periodically thereafter.',
  },

  // --- Career ---
  {
    id: 17,
    category: 'Career Paths',
    question: 'Which professional qualification is specifically focused on sanctions and financial crime compliance?',
    options: [
      'CFA (Chartered Financial Analyst)',
      'ICA Certificate in Compliance',
      'ACCA (Chartered Accountant)',
      'PMP (Project Management Professional)',
    ],
    correctIndex: 1,
    explanation:
      'The ICA (International Compliance Association) Certificate in Compliance is specifically designed for financial crime and sanctions compliance professionals. ACAMS (Association of Certified Anti-Money Laundering Specialists) is another key qualification.',
  },
  {
    id: 18,
    category: 'Career Paths',
    question: 'What makes customer service experience valuable for moving into sanctions compliance?',
    options: [
      'Nothing — they are completely unrelated fields',
      'Understanding customer interactions, attention to detail, and familiarity with banking processes',
      'Customer service pays more',
      'Regulators require it',
    ],
    correctIndex: 1,
    explanation:
      'Customer service experience in banking provides valuable transferable skills: you understand customer data, banking products, how transactions work, and you\'ve developed attention to detail and communication skills — all essential in compliance.',
  },

  // --- Geography / Applied Knowledge ---
  {
    id: 19,
    category: 'Applied Knowledge',
    question: 'Which of these countries is subject to comprehensive sanctions from ALL four major bodies (UK, US, EU, UN)?',
    options: [
      'China',
      'Venezuela',
      'Cuba',
      'North Korea',
    ],
    correctIndex: 3,
    explanation:
      'North Korea is comprehensively sanctioned by the UK, US, EU, and UN — one of the most heavily sanctioned countries in the world. Cuba is comprehensively sanctioned mainly by the US. China has targeted sanctions only.',
  },
  {
    id: 20,
    category: 'Applied Knowledge',
    question: 'A customer named "Kim Jong-un" wants to open an account. What should happen?',
    options: [
      'Open the account — it could be a different person',
      'The screening system should flag this as a potential match to the DPRK sanctions list for investigation',
      'Refuse immediately without investigation',
      'Ask the customer if they are the real Kim Jong-un',
    ],
    correctIndex: 1,
    explanation:
      'The name should be flagged by the screening system for investigation. An analyst would then check additional identifiers (date of birth, nationality, address) to determine if this is the sanctioned individual or someone else with the same name. Never assume — always investigate properly.',
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

type QuizState = 'intro' | 'active' | 'review'

export default function QuizPage() {
  const [state, setState] = useState<QuizState>('intro')
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => new Array(questions.length).fill(null)
  )
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const current = questions[currentIdx]
  const isCorrect = selectedOption === current?.correctIndex
  const score = answers.filter((a, i) => a === questions[i].correctIndex).length
  const answered = answers.filter((a) => a !== null).length

  const handleSelect = useCallback(
    (optionIdx: number) => {
      if (showFeedback) return // already answered
      setSelectedOption(optionIdx)
      setShowFeedback(true)
      setAnswers((prev) => {
        const next = [...prev]
        next[currentIdx] = optionIdx
        return next
      })
    },
    [showFeedback, currentIdx]
  )

  const handleNext = useCallback(() => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1)
      setSelectedOption(null)
      setShowFeedback(false)
    } else {
      setState('review')
    }
  }, [currentIdx])

  const handleRestart = useCallback(() => {
    setState('intro')
    setCurrentIdx(0)
    setSelectedOption(null)
    setShowFeedback(false)
    setAnswers(new Array(questions.length).fill(null))
  }, [])

  // --- Intro ---
  if (state === 'intro') {
    return (
      <div className="page-content">
        <div className="hero-section">
          <h1>Sanctions Knowledge Quiz</h1>
          <p className="subtitle">
            Test your understanding of international sanctions — from the basics through
            to screening processes and career paths. No time limit, no pressure.
          </p>
          <div className="hero-badge">{questions.length} questions · Multiple choice</div>
        </div>

        <div className="section-card" style={{ textAlign: 'center' }}>
          <h2 style={{ justifyContent: 'center' }}>How it works</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 20,
              margin: '24px 0',
              textAlign: 'center',
            }}
          >
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📖</div>
              <h3 style={{ fontSize: 15, marginBottom: 4 }}>Read the question</h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                Take your time — there is no timer
              </p>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🎯</div>
              <h3 style={{ fontSize: 15, marginBottom: 4 }}>Pick your answer</h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                Select the option you think is correct
              </p>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>💡</div>
              <h3 style={{ fontSize: 15, marginBottom: 4 }}>Learn from feedback</h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                Every answer includes an explanation
              </p>
            </div>
          </div>

          <button className="quiz-start-btn" onClick={() => setState('active')}>
            Start Quiz
          </button>
        </div>
      </div>
    )
  }

  // --- Review ---
  if (state === 'review') {
    const pct = Math.round((score / questions.length) * 100)
    let message = ''
    let messageColor = ''
    if (pct >= 90) {
      message = 'Outstanding! You really know your sanctions.'
      messageColor = 'var(--accent-teal)'
    } else if (pct >= 70) {
      message = 'Great work! A solid understanding of the fundamentals.'
      messageColor = 'var(--accent-blue)'
    } else if (pct >= 50) {
      message = 'Good effort! Review the explanations below to strengthen your knowledge.'
      messageColor = 'var(--accent-amber)'
    } else {
      message = 'A good start! Read through the Learn page and try again — you\'ll improve quickly.'
      messageColor = 'var(--accent-rose)'
    }

    return (
      <div className="page-content">
        <div className="hero-section">
          <h1>Quiz Complete</h1>
          <p className="subtitle" style={{ color: messageColor, fontWeight: 600 }}>
            {message}
          </p>
        </div>

        <div className="section-card" style={{ textAlign: 'center', marginBottom: 32 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: messageColor,
              lineHeight: 1.2,
            }}
          >
            {score}/{questions.length}
          </div>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', marginTop: 4 }}>
            {pct}% correct
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
            <button className="quiz-start-btn" onClick={handleRestart}>
              Try Again
            </button>
            <a href="/" className="quiz-start-btn" style={{ background: 'var(--accent-blue)', textDecoration: 'none' }}>
              Review Learn Page
            </a>
          </div>
        </div>

        {/* Review all questions */}
        <h2 style={{ fontSize: 18, marginBottom: 16, color: 'var(--text-primary)' }}>
          Review Your Answers
        </h2>
        {questions.map((q, qi) => {
          const userAnswer = answers[qi]
          const wasCorrect = userAnswer === q.correctIndex
          return (
            <div
              key={q.id}
              className="section-card"
              style={{
                borderLeft: `4px solid ${wasCorrect ? 'var(--accent-teal)' : 'var(--accent-rose)'}`,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  color: 'var(--text-muted)',
                  marginBottom: 6,
                }}
              >
                {q.category}
              </div>
              <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>
                {qi + 1}. {q.question}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                {q.options.map((opt, oi) => {
                  let bg = 'var(--bg-accent)'
                  let border = 'transparent'
                  if (oi === q.correctIndex) {
                    bg = 'rgba(91, 163, 158, 0.15)'
                    border = 'var(--accent-teal)'
                  } else if (oi === userAnswer && !wasCorrect) {
                    bg = 'rgba(181, 114, 126, 0.15)'
                    border = 'var(--accent-rose)'
                  }
                  return (
                    <div
                      key={oi}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 8,
                        background: bg,
                        borderLeft: `3px solid ${border}`,
                        fontSize: 14,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {oi === q.correctIndex && '✓ '}
                      {oi === userAnswer && !wasCorrect && '✗ '}
                      {opt}
                    </div>
                  )
                })}
              </div>

              <div className="info-box" style={{ marginTop: 8 }}>
                <p>{q.explanation}</p>
              </div>
            </div>
          )
        })}

        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <button className="quiz-start-btn" onClick={handleRestart}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // --- Active Quiz ---
  return (
    <div className="page-content">
      {/* Progress bar */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Question {currentIdx + 1} of {questions.length}
          </span>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            {score} correct so far
          </span>
        </div>
        <div
          style={{
            height: 6,
            background: 'var(--bg-accent)',
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${((currentIdx + (showFeedback ? 1 : 0)) / questions.length) * 100}%`,
              background: 'var(--accent-teal)',
              borderRadius: 3,
              transition: 'width 0.4s ease',
            }}
          />
        </div>
      </div>

      <div className="section-card">
        {/* Category badge */}
        <div
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: 12,
            background: 'var(--bg-accent)',
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            color: 'var(--text-muted)',
            marginBottom: 16,
          }}
        >
          {current.category}
        </div>

        {/* Question */}
        <h2 style={{ fontSize: 19, lineHeight: 1.5, marginBottom: 24 }}>{current.question}</h2>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {current.options.map((option, oi) => {
            let bg = 'var(--bg-accent)'
            let border = 'transparent'
            let color = 'var(--text-primary)'
            let cursor = 'pointer'

            if (showFeedback) {
              cursor = 'default'
              if (oi === current.correctIndex) {
                bg = 'rgba(91, 163, 158, 0.2)'
                border = 'var(--accent-teal)'
                color = 'var(--accent-teal)'
              } else if (oi === selectedOption && oi !== current.correctIndex) {
                bg = 'rgba(181, 114, 126, 0.15)'
                border = 'var(--accent-rose)'
                color = 'var(--accent-rose)'
              }
            } else if (oi === selectedOption) {
              border = 'var(--accent-blue)'
            }

            return (
              <button
                key={oi}
                onClick={() => handleSelect(oi)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '14px 18px',
                  borderRadius: 10,
                  background: bg,
                  border: 'none',
                  borderLeft: `4px solid ${border}`,
                  fontSize: 15,
                  fontFamily: 'inherit',
                  color,
                  cursor,
                  transition: 'all 0.2s',
                  lineHeight: 1.5,
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: showFeedback && oi === current.correctIndex
                      ? 'var(--accent-teal)'
                      : showFeedback && oi === selectedOption && oi !== current.correctIndex
                      ? 'var(--accent-rose)'
                      : 'rgba(0,0,0,0.08)',
                    color: showFeedback && (oi === current.correctIndex || oi === selectedOption)
                      ? 'white'
                      : 'var(--text-muted)',
                    fontSize: 12,
                    fontWeight: 700,
                    marginRight: 12,
                    flexShrink: 0,
                  }}
                >
                  {showFeedback && oi === current.correctIndex
                    ? '✓'
                    : showFeedback && oi === selectedOption && oi !== current.correctIndex
                    ? '✗'
                    : String.fromCharCode(65 + oi)}
                </span>
                {option}
              </button>
            )
          })}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div
            style={{
              marginTop: 20,
              padding: 20,
              borderRadius: 10,
              background: isCorrect
                ? 'rgba(91, 163, 158, 0.1)'
                : 'rgba(181, 114, 126, 0.08)',
              borderLeft: `4px solid ${isCorrect ? 'var(--accent-teal)' : 'var(--accent-rose)'}`,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                marginBottom: 6,
                color: isCorrect ? 'var(--accent-teal)' : 'var(--accent-rose)',
              }}
            >
              {isCorrect ? 'Correct!' : 'Not quite'}
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
              {current.explanation}
            </p>
          </div>
        )}

        {/* Next button */}
        {showFeedback && (
          <div style={{ textAlign: 'right', marginTop: 20 }}>
            <button className="quiz-start-btn" onClick={handleNext}>
              {currentIdx < questions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
