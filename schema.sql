-- ISW 추리게임 데이터베이스 스키마

-- 사용자 테이블
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 게임 세션 테이블
CREATE TABLE IF NOT EXISTS game_sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    difficulty TEXT NOT NULL,
    case_type TEXT NOT NULL,
    status TEXT DEFAULT 'in_progress',
    score INTEGER DEFAULT 0,
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 게임 결과 테이블
CREATE TABLE IF NOT EXISTS game_results (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    accused_suspect TEXT,
    actual_culprit TEXT,
    clues_found INTEGER DEFAULT 0,
    interrogations_done INTEGER DEFAULT 0,
    time_spent_seconds INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES game_sessions(id)
);

-- 리더보드 테이블
CREATE TABLE IF NOT EXISTS leaderboard (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    username TEXT NOT NULL,
    score INTEGER NOT NULL,
    difficulty TEXT NOT NULL,
    games_played INTEGER DEFAULT 1,
    games_won INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_game_sessions_user ON game_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_game_results_session ON game_results(session_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON leaderboard(score DESC);
