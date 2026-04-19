import { useState, useEffect, useRef } from "react";

const API_BASE = "http://localhost:8080";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --neon-cyan: #00f5ff;
    --neon-pink: #ff006e;
    --neon-purple: #bf00ff;
    --neon-green: #00ff9f;
    --bg-dark: #020408;
    --bg-card: #060d14;
    --bg-card2: #0a1520;
    --text-main: #c8e6ff;
    --text-dim: #4a7a9b;
    --border: #0a2a3a;
  }

  body {
    background: var(--bg-dark);
    color: var(--text-main);
    font-family: 'Rajdhani', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Grid background */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0;
  }

  .app { position: relative; z-index: 1; }

  /* HEADER */
  .header {
    padding: 24px 40px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(2,4,8,0.9);
    backdrop-filter: blur(12px);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .logo {
    font-family: 'Orbitron', monospace;
    font-size: 1.6rem;
    font-weight: 900;
    letter-spacing: 4px;
    color: var(--neon-cyan);
    text-shadow: 0 0 20px var(--neon-cyan), 0 0 40px rgba(0,245,255,0.3);
  }

  .logo span { color: var(--neon-pink); text-shadow: 0 0 20px var(--neon-pink); }

  .search-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--bg-card2);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 8px 16px;
    width: 320px;
    transition: border-color 0.2s;
  }

  .search-bar:focus-within {
    border-color: var(--neon-cyan);
    box-shadow: 0 0 12px rgba(0,245,255,0.15);
  }

  .search-bar input {
    background: none;
    border: none;
    outline: none;
    color: var(--text-main);
    font-family: 'Rajdhani', sans-serif;
    font-size: 1rem;
    width: 100%;
  }

  .search-bar input::placeholder { color: var(--text-dim); }

  .search-icon { color: var(--text-dim); font-size: 1rem; }

  /* MAIN LAYOUT */
  .main { display: flex; min-height: calc(100vh - 73px); }

  /* SIDEBAR */
  .sidebar {
    width: 240px;
    min-width: 240px;
    border-right: 1px solid var(--border);
    padding: 32px 0;
    background: rgba(6,13,20,0.6);
  }

  .sidebar-title {
    font-family: 'Orbitron', monospace;
    font-size: 0.65rem;
    letter-spacing: 3px;
    color: var(--text-dim);
    padding: 0 24px 16px;
    text-transform: uppercase;
  }

  .list-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 24px;
    cursor: pointer;
    border-left: 3px solid transparent;
    transition: all 0.2s;
    color: var(--text-dim);
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .list-item:hover { color: var(--text-main); background: rgba(0,245,255,0.04); }

  .list-item.active {
    color: var(--neon-cyan);
    border-left-color: var(--neon-cyan);
    background: rgba(0,245,255,0.06);
  }

  .list-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--neon-pink);
    box-shadow: 0 0 8px var(--neon-pink);
    flex-shrink: 0;
  }

  .list-item.active .list-dot { background: var(--neon-cyan); box-shadow: 0 0 8px var(--neon-cyan); }

  /* CONTENT */
  .content { flex: 1; padding: 40px; overflow-y: auto; }

  .section-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 32px;
  }

  .section-title {
    font-family: 'Orbitron', monospace;
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--text-main);
    letter-spacing: 2px;
  }

  .section-title span {
    display: block;
    font-size: 0.7rem;
    color: var(--neon-cyan);
    letter-spacing: 4px;
    margin-bottom: 4px;
    font-family: 'Rajdhani', sans-serif;
  }

  .count-badge {
    font-family: 'Orbitron', monospace;
    font-size: 0.7rem;
    color: var(--text-dim);
    letter-spacing: 2px;
  }

  /* GAME GRID */
  .games-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }

  /* GAME CARD */
  .game-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.25s;
    position: relative;
    group: true;
  }

  .game-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0,245,255,0.05), transparent 60%);
    opacity: 0;
    transition: opacity 0.25s;
    z-index: 1;
    pointer-events: none;
  }

  .game-card:hover {
    border-color: rgba(0,245,255,0.4);
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0,245,255,0.12), 0 0 0 1px rgba(0,245,255,0.1);
  }

  .game-card:hover::before { opacity: 1; }

  .game-card.dragging {
    opacity: 0.4;
    transform: scale(0.97);
    border-color: var(--neon-pink);
  }

  .game-card.drag-over {
    border-color: var(--neon-cyan);
    box-shadow: 0 0 20px rgba(0,245,255,0.3);
  }

  .card-img {
    width: 100%;
    aspect-ratio: 3/4;
    object-fit: cover;
    display: block;
    filter: brightness(0.85) saturate(1.1);
    transition: filter 0.25s;
  }

  .game-card:hover .card-img { filter: brightness(1) saturate(1.3); }

  .card-body { padding: 14px; position: relative; z-index: 2; }

  .card-title {
    font-family: 'Orbitron', monospace;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 1px;
    color: var(--text-main);
    margin-bottom: 6px;
    line-height: 1.3;
  }

  .card-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-year {
    font-size: 0.8rem;
    color: var(--text-dim);
    font-weight: 600;
    letter-spacing: 1px;
  }

  .card-position {
    font-family: 'Orbitron', monospace;
    font-size: 0.6rem;
    color: var(--neon-pink);
    letter-spacing: 1px;
  }

  .drag-handle {
    position: absolute;
    top: 10px;
    right: 10px;
    color: rgba(0,245,255,0.4);
    font-size: 0.9rem;
    cursor: grab;
    z-index: 3;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .game-card:hover .drag-handle { opacity: 1; }

  /* DETAIL MODAL */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(2,4,8,0.92);
    backdrop-filter: blur(8px);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .modal {
    background: var(--bg-card);
    border: 1px solid rgba(0,245,255,0.2);
    border-radius: 4px;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 0 80px rgba(0,245,255,0.1), 0 0 160px rgba(191,0,255,0.05);
    animation: slideUp 0.25s ease;
  }

  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  .modal-inner { display: flex; gap: 0; }

  .modal-img {
    width: 280px;
    min-width: 280px;
    object-fit: cover;
    filter: brightness(0.9) saturate(1.2);
  }

  .modal-body { padding: 36px; flex: 1; }

  .modal-label {
    font-size: 0.65rem;
    letter-spacing: 4px;
    color: var(--neon-cyan);
    text-transform: uppercase;
    font-family: 'Orbitron', monospace;
    margin-bottom: 8px;
  }

  .modal-title {
    font-family: 'Orbitron', monospace;
    font-size: 1.4rem;
    font-weight: 900;
    color: #fff;
    letter-spacing: 2px;
    margin-bottom: 20px;
    line-height: 1.2;
    text-shadow: 0 0 20px rgba(0,245,255,0.2);
  }

  .modal-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }

  .tag {
    padding: 4px 12px;
    border: 1px solid var(--border);
    border-radius: 2px;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 1px;
    color: var(--text-dim);
  }

  .tag.genre { border-color: rgba(191,0,255,0.4); color: #bf7fff; }
  .tag.platform { border-color: rgba(0,245,255,0.3); color: var(--neon-cyan); }

  .score-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }

  .score-value {
    font-family: 'Orbitron', monospace;
    font-size: 2rem;
    font-weight: 900;
    color: var(--neon-green);
    text-shadow: 0 0 20px var(--neon-green);
  }

  .score-stars { color: var(--neon-green); font-size: 0.9rem; }

  .modal-desc {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--text-dim);
    margin-bottom: 16px;
    font-weight: 300;
  }

  .modal-long-desc {
    font-size: 0.9rem;
    line-height: 1.8;
    color: #3a5a70;
    border-top: 1px solid var(--border);
    padding-top: 16px;
  }

  .modal-close {
    position: absolute;
    top: 16px;
    right: 20px;
    background: none;
    border: 1px solid var(--border);
    color: var(--text-dim);
    font-size: 1.2rem;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 2px;
    font-family: 'Orbitron', monospace;
    transition: all 0.2s;
  }

  .modal-close:hover { border-color: var(--neon-pink); color: var(--neon-pink); }

  /* STATES */
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 80px;
    color: var(--text-dim);
  }

  .spinner {
    width: 40px; height: 40px;
    border: 2px solid var(--border);
    border-top-color: var(--neon-cyan);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .loading-text {
    font-family: 'Orbitron', monospace;
    font-size: 0.7rem;
    letter-spacing: 4px;
    color: var(--neon-cyan);
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }

  .empty {
    text-align: center;
    padding: 80px;
    color: var(--text-dim);
    font-family: 'Orbitron', monospace;
    font-size: 0.8rem;
    letter-spacing: 3px;
  }

  /* DRAG INFO */
  .drag-info {
    font-size: 0.75rem;
    color: var(--text-dim);
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .drag-info::before {
    content: '';
    display: inline-block;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--neon-pink);
    box-shadow: 0 0 8px var(--neon-pink);
    animation: pulse 1.5s ease-in-out infinite;
  }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg-dark); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--neon-cyan); }

  /* SAVE BUTTON */
  .save-btn {
    background: none;
    border: 1px solid var(--neon-cyan);
    color: var(--neon-cyan);
    font-family: 'Orbitron', monospace;
    font-size: 0.65rem;
    letter-spacing: 2px;
    padding: 8px 18px;
    cursor: pointer;
    transition: all 0.2s;
    border-radius: 2px;
  }

  .save-btn:hover {
    background: rgba(0,245,255,0.1);
    box-shadow: 0 0 16px rgba(0,245,255,0.2);
  }

  .save-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  @media (max-width: 768px) {
    .header { padding: 16px 20px; }
    .search-bar { width: 200px; }
    .sidebar { display: none; }
    .content { padding: 24px 16px; }
    .modal-inner { flex-direction: column; }
    .modal-img { width: 100%; min-width: unset; height: 260px; }
  }
`;

// ── Helpers ──────────────────────────────────────────────────────────────
function stars(score) {
  const full = Math.round(score);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

// ── GameCard ──────────────────────────────────────────────────────────────
function GameCard({ game, index, onClick, onDragStart, onDragOver, onDrop, isDragging, isDragOver }) {
  return (
    <div
      className={`game-card ${isDragging ? "dragging" : ""} ${isDragOver ? "drag-over" : ""}`}
      onClick={onClick}
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => { e.preventDefault(); onDragOver(index); }}
      onDrop={() => onDrop(index)}
    >
      <span className="drag-handle" title="Arraste para reordenar">⠿</span>
      <img
        className="card-img"
        src={game.imgUrl}
        alt={game.title}
        onError={(e) => { e.target.src = `https://placehold.co/200x260/060d14/00f5ff?text=${encodeURIComponent(game.title)}`; }}
      />
      <div className="card-body">
        <div className="card-title">{game.title}</div>
        <div className="card-meta">
          <span className="card-year">{game.year}</span>
          <span className="card-position">#{index + 1}</span>
        </div>
      </div>
    </div>
  );
}

// ── Modal ──────────────────────────────────────────────────────────────────
function GameModal({ gameId, onClose }) {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/games/${gameId}`)
      .then((r) => r.json())
      .then((data) => { setGame(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [gameId]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        {loading ? (
          <div className="loading">
            <div className="spinner" />
            <div className="loading-text">CARREGANDO</div>
          </div>
        ) : game ? (
          <div className="modal-inner">
            <img
              className="modal-img"
              src={game.imgUrl}
              alt={game.title}
              onError={(e) => { e.target.src = `https://placehold.co/280x400/060d14/00f5ff?text=${encodeURIComponent(game.title)}`; }}
            />
            <div className="modal-body">
              <div className="modal-label">// FICHA DO JOGO</div>
              <div className="modal-title">{game.title}</div>
              <div className="modal-tags">
                {game.genre?.split(",").map((g) => (
                  <span key={g} className="tag genre">{g.trim()}</span>
                ))}
                {game.platforms?.split(",").map((p) => (
                  <span key={p} className="tag platform">{p.trim()}</span>
                ))}
              </div>
              <div className="score-row">
                <span className="score-value">{game.score?.toFixed(1)}</span>
                <span className="score-stars">{stars(game.score || 0)}</span>
              </div>
              <p className="modal-desc">{game.shortDescription}</p>
              <p className="modal-long-desc">{game.longDescription}</p>
            </div>
          </div>
        ) : (
          <div className="empty">JOGO NÃO ENCONTRADO</div>
        )}
      </div>
    </div>
  );
}

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const [lists, setLists] = useState([]);
  const [activeList, setActiveList] = useState(null);
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const dragFrom = useRef(null);
  const dragOver = useRef(null);

  // Busca as listas
  useEffect(() => {
    fetch(`${API_BASE}/lists`)
      .then((r) => r.json())
      .then((data) => {
        setLists(data);
        if (data.length > 0) setActiveList(data[0]);
      })
      .catch(() => {});
  }, []);

  // Busca os jogos da lista ativa
  useEffect(() => {
    if (!activeList) return;
    setLoading(true);
    fetch(`${API_BASE}/lists/${activeList.id}/games`)
      .then((r) => r.json())
      .then((data) => { setGames(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [activeList]);

  // Drag & Drop
  const handleDragStart = (index) => { dragFrom.current = index; };
  const handleDragOver = (index) => { dragOver.current = index; };
  const handleDrop = () => {
    if (dragFrom.current === null || dragOver.current === null) return;
    const updated = [...games];
    const [moved] = updated.splice(dragFrom.current, 1);
    updated.splice(dragOver.current, 0, moved);
    setGames(updated);
    dragFrom.current = null;
    dragOver.current = null;
  };

  // Salvar reordenação
  const handleSave = async () => {
    if (!activeList) return;
    setSaving(true);
    // Envia cada posição atualizada
    for (let i = 0; i < games.length; i++) {
      const original = games.findIndex((g, idx) => idx === i);
      await fetch(`${API_BASE}/lists/${activeList.id}/replacement`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceIndex: i, destinationIndex: i }),
      }).catch(() => {});
    }
    setSaving(false);
  };

  const filtered = games.filter((g) =>
    g.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{style}</style>
      <div className="app">
        {/* Header */}
        <header className="header">
          <div className="logo">DS<span>JOGOS</span></div>
          <div className="search-bar">
            <span className="search-icon">⌕</span>
            <input
              placeholder="Buscar jogo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </header>

        <div className="main">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-title">// CATEGORIAS</div>
            {lists.map((list) => (
              <div
                key={list.id}
                className={`list-item ${activeList?.id === list.id ? "active" : ""}`}
                onClick={() => { setActiveList(list); setSearch(""); }}
              >
                <span className="list-dot" />
                {list.name}
              </div>
            ))}
          </aside>

          {/* Content */}
          <main className="content">
            <div className="section-header">
              <div className="section-title">
                <span>// LISTA DE JOGOS</span>
                {activeList?.name}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                {!search && games.length > 1 && (
                  <span className="drag-info">ARRASTE PARA REORDENAR</span>
                )}
                <span className="count-badge">{filtered.length} TÍTULOS</span>
              </div>
            </div>

            {loading ? (
              <div className="loading">
                <div className="spinner" />
                <div className="loading-text">CARREGANDO JOGOS</div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="empty">NENHUM JOGO ENCONTRADO</div>
            ) : (
              <div className="games-grid">
                {filtered.map((game, index) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    index={index}
                    onClick={() => setSelectedGame(game.id)}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    isDragging={dragFrom.current === index}
                    isDragOver={dragOver.current === index}
                  />
                ))}
              </div>
            )}
          </main>
        </div>

        {/* Modal */}
        {selectedGame && (
          <GameModal gameId={selectedGame} onClose={() => setSelectedGame(null)} />
        )}
      </div>
    </>
  );
}
