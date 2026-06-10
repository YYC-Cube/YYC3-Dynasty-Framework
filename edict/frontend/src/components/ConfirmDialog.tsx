import { useEffect, useState } from 'react';

interface Props {
  title: string;
  message: string;
  okLabel: string;
  okClass?: string;
  onOk: (reason: string) => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ title, message, okLabel, okClass, onOk, onCancel }: Props) {
  const [reason, setReason] = useState('');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onCancel]);

  return (
    <div className="modal-bg open" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480 }}>
        <button className="modal-close" onClick={onCancel}>✕</button>
        <div className="modal-body">
          <div className="confirm-title" style={{ fontSize: 16, fontWeight: 800, marginBottom: 10 }} dangerouslySetInnerHTML={{ __html: title }} />
          <div className="confirm-msg" style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: message }} />
          <textarea
            className="confirm-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="输入原因（可留空）"
            rows={2}
          />
          <div className="confirm-btns" style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button className="btn btn-secondary" onClick={onCancel}>取消</button>
            <button className={`btn ${okClass || 'btn-primary'}`} onClick={() => onOk(reason)}>
              {okLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
