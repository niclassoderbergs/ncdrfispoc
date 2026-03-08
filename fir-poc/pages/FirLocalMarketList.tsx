
import React, { useState } from 'react';
import { pocStyles } from '../styles';
import { MapPin, Info, TowerControl, ChevronRight, Zap, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { mockLocalMarkets } from '../mockData';

interface Props {
  onSelect: (id: string) => void;
}

export const FirLocalMarketList: React.FC<Props> = ({ onSelect }) => {
  const [isHowToExpanded, setIsHowToExpanded] = useState(false);
  return (
    <div style={pocStyles.content}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ ...pocStyles.pageTitle, marginBottom: '8px' }}>Local Markets</h1>
          <p style={{ color: '#6b778c', fontSize: '0.9rem' }}>Regional and local flexibility platforms integrated with the FIS.</p>
        </div>
      </div>

      <div style={{...pocStyles.section, backgroundColor: '#f8fafd', marginBottom: '16px'}}>
        <button
          type="button"
          onClick={() => setIsHowToExpanded(prev => !prev)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer'
          }}
        >
          <h3 style={{...pocStyles.sectionTitle, marginBottom: 0}}>
            <FileText size={18} style={{marginRight: '8px', verticalAlign: 'middle'}} />
            How To Read This Page
          </h3>
          {isHowToExpanded ? <ChevronUp size={18} color="#42526e" /> : <ChevronDown size={18} color="#42526e" />}
        </button>
        {isHowToExpanded && (
          <div style={{display: 'grid', gap: '10px', fontSize: '0.9rem', color: '#172b4d', lineHeight: '1.55', marginTop: '14px'}}>
            <div>This page lists the local flexibility markets available in FIS.</div>
            <div><strong>Market card information:</strong></div>
            <div><strong>Market Name & Owner:</strong> Name of the market and responsible DSO/operator.</div>
            <div><strong>Status:</strong> Current operational status of the market.</div>
            <div><strong>Products:</strong> Product families available in the market.</div>
            <div><strong>Description:</strong> Short market purpose and scope.</div>
            <div><strong>Click a market card</strong> to open detailed market information (for example E.ON Switch).</div>
          </div>
        )}
      </div>
      <div style={{ ...pocStyles.section, padding: '20px', backgroundColor: '#f9f8ff', border: '1px solid #e1bee7', display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '32px' }}>
        <Info size={24} color="#4a148c" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h4 style={{ margin: '0 0 8px 0', color: '#4a148c', fontWeight: 700 }}>About Local Market Integration</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#172b4d', lineHeight: '1.5' }}>
            Local markets (LFM) are operated by DSOs or third parties. FIS ensures that resources participating in these markets are technically qualified and that activations do not conflict with transmission-level balancing or grid security constraints.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '20px' }}>
        {mockLocalMarkets.map(market => (
          <div 
            key={market.id} 
            onClick={() => onSelect(market.id)}
            style={{ 
              backgroundColor: '#fff', 
              border: '1px solid #dfe1e6', 
              borderRadius: '12px', 
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.08)';
              e.currentTarget.style.borderColor = '#0052cc';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#dfe1e6';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ backgroundColor: '#e6effc', padding: '10px', borderRadius: '8px', color: '#0052cc' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#172b4d' }}>{market.name}</h3>
                  <div style={{ fontSize: '0.75rem', color: '#6b778c', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    <TowerControl size={12} /> {market.owner}
                  </div>
                </div>
              </div>
              <span style={{ ...pocStyles.badge, ...pocStyles.badgeGreen }}>{market.status}</span>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#42526e', lineHeight: '1.5', margin: 0 }}>
              {market.description}
            </p>

            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #ebecf0', paddingTop: '16px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {market.products.map(p => (
                  <span key={p} style={{ ...pocStyles.badge, backgroundColor: '#f0f7ff', color: '#0052cc', fontSize: '0.7rem' }}>
                    <Zap size={10} style={{ display: 'inline', marginRight: '4px' }} /> {p}
                  </span>
                ))}
              </div>
              <div style={{ color: '#0052cc', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Manage Market <ChevronRight size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


