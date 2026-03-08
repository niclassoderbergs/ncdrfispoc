
import React, { useMemo, useState } from 'react';
import { pocStyles } from '../styles';
import { mockCUs, mockSPGs, mockDSOs, mockREs, mockBRPs, mockBSPs, mockSPs, mockRegResponsibles } from '../mockData';
import { ArrowLeft, ArrowRight, ChevronRight, ChevronLeft, FileText, ChevronDown, ChevronUp } from 'lucide-react';

// Sub-components
import { PartyHeader } from './party-roles/PartyHeader';
import { DsoRoleView } from './party-roles/DsoRoleView';
import { ReRoleView } from './party-roles/ReRoleView';
import { BrpRoleView } from './party-roles/BrpRoleView';
import { SpRoleView } from './party-roles/SpRoleView';
import { SpAgreementView } from './party-roles/SpAgreementView';
import { SpDsoSettlementView } from './party-roles/SpDsoSettlementView';
import { CurrRoleView } from './party-roles/CurrRoleView';
import { TechnicalDetails } from './party-roles/TechnicalDetails';

interface Props {
  partyName: string;
  prevParty: string | null;
  nextParty: string | null;
  onSelectParty: (name: string) => void;
  onBack: () => void;
  onSelectCU: (id: string) => void;
  onSelectSPG: (id: string) => void;
}

const styles = {
  stickyHeader: {
    position: 'sticky' as const,
    top: '56px',
    zIndex: 90,
    backgroundColor: '#f4f5f7',
    padding: '12px 0',
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #dfe1e6'
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: '#fff',
    border: '1px solid #dfe1e6',
    borderRadius: '4px',
    color: '#42526e',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.1s'
  }
};

export const FirPartyDetail: React.FC<Props> = ({ partyName, prevParty, nextParty, onSelectParty, onBack, onSelectCU, onSelectSPG }) => {
  const [isHowToExpanded, setIsHowToExpanded] = useState(false);
  // 1. Determine Roles using dedicated registries
  const roles = useMemo(() => {
    const isBSP = mockBSPs.some(s => s.name === partyName);
    const isSP = isBSP || mockSPs.some(s => s.name === partyName) || mockCUs.some(c => c.sp === partyName);
    const isREG = mockRegResponsibles.some(r => r.name === partyName) || mockCUs.some(c => c.registrationResponsible === partyName);
    
    return {
        isDSO: mockDSOs.some(d => d.name === partyName),
        isRE: mockREs.some(r => r.name === partyName),
        isBRP: mockBRPs.some(b => b.name === partyName),
        isBSP,
        isSP,
        isREG
    };
  }, [partyName]);

  // 2. Aggregate Data for SP/BSP
  const ownedCUs = useMemo(() => mockCUs.filter(cu => cu.sp === partyName), [partyName]);
  const managedSPGs = useMemo(() => mockSPGs.filter(spg => spg.fsp === partyName), [partyName]);

  // 3. Aggregate Data for DSO
  const managedMGAs = useMemo(() => mockDSOs.filter(d => d.name === partyName), [partyName]);

  // 4. Aggregate Data for RE
  const retailCustomers = useMemo(() => mockCUs.filter(cu => cu.re === partyName), [partyName]);

  // 5. Aggregate Data for BRP
  const balanceCUs = useMemo(() => mockCUs.filter(cu => cu.brp === partyName), [partyName]);
  
  const brpStatsByRE = useMemo(() => {
    if (!roles.isBRP) return [];
    const reMap = new Map<string, { count: number, capacity: number }>();
    
    balanceCUs.forEach(cu => {
      const existing = reMap.get(cu.re) || { count: 0, capacity: 0 };
      reMap.set(cu.re, {
        count: existing.count + 1,
        capacity: existing.capacity + cu.capacity
      });
    });

    return Array.from(reMap.entries())
      .map(([reName, stats]) => ({ name: reName, ...stats }))
      .sort((a, b) => b.count - a.count);
  }, [roles.isBRP, balanceCUs]);

  return (
    <div style={pocStyles.content}>
      {/* STICKY HEADER NAVIGATION */}
      <div style={styles.stickyHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#5e6c84', cursor: 'pointer' }}>
            <span onClick={onBack}>Home</span>
            <ChevronRight size={14} />
            <span onClick={onBack} style={{ textDecoration: 'underline' }}>Parties</span>
            <ChevronRight size={14} />
            <span style={{ color: '#172b4d', fontWeight: 500 }}>{partyName}</span>
          </div>
          <div style={{display: 'flex', gap: '8px'}}>
                <button 
                    style={{...styles.navButton, opacity: prevParty ? 1 : 0.4, cursor: prevParty ? 'pointer' : 'not-allowed'}}
                    disabled={!prevParty}
                    onClick={() => prevParty && onSelectParty(prevParty)}
                >
                    <ChevronLeft size={16} /> Prev
                </button>
                <button 
                    style={{...styles.navButton, opacity: nextParty ? 1 : 0.4, cursor: nextParty ? 'pointer' : 'not-allowed'}}
                    disabled={!nextParty}
                    onClick={() => nextParty && onSelectParty(nextParty)}
                >
                    Next <ChevronRight size={16} />
                </button>
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
          <div style={{display: 'grid', gap: '8px', fontSize: '0.9rem', color: '#172b4d', lineHeight: '1.55', marginTop: '14px'}}>
            <div><strong>CU Registration Responsible (CURR):</strong> CUs registered by the actor.</div>
            <div><strong>Service Provider (SP) - Flexibility Agreements:</strong> CUs where the actor holds flexibility agreements (note: SP can hold agreements for CUs they did not register).</div>
            <div><strong>Balance Service Provider (BSP) - Market Operations:</strong> Bids and verified volume.</div>
            <div><strong>Service Provider (SP) - DSO Settlement:</strong> Bids and volume for the local flexibility market.</div>
            <div><strong>Balance Responsible Party (BRP):</strong> Total volume for imbalance adjustment, split by RE for traceability. Calculated on all activations regardless of market/SP.</div>
            <div><strong>Electricity Supplier (RE) - Compensation Basis:</strong> Volume the actor is to be compensated for in the electricity supplier role.</div>
          </div>
        )}
      </div>

      <PartyHeader partyName={partyName} roles={roles} onBack={onBack} />

      <TechnicalDetails isDSO={roles.isDSO} isRE={roles.isRE} />

      {roles.isREG && (
        <CurrRoleView partyName={partyName} onSelectCU={onSelectCU} />
      )}

      {/* SERVICE PROVIDER ROLE: Flexibility Agreements */}
      {roles.isSP && (
        <SpAgreementView partyName={partyName} onSelectCU={onSelectCU} />
      )}

      {/* BALANCE SERVICE PROVIDER ROLE: BSP Settlement (TSO) */}
      {roles.isBSP && (
        <SpRoleView 
          managedSPGs={managedSPGs} 
          ownedCUs={ownedCUs} 
          onSelectSPG={onSelectSPG} 
          isBSP={true}
        />
      )}

      {/* SERVICE PROVIDER ROLE: DSO Settlement (Local Markets) */}
      {roles.isSP && (
        <SpDsoSettlementView 
          managedSPGs={managedSPGs} 
          ownedCUs={ownedCUs} 
          onSelectSPG={onSelectSPG} 
        />
      )}

      {roles.isDSO && (
        <DsoRoleView managedMGAs={managedMGAs} />
      )}

      {roles.isBRP && (
        <BrpRoleView 
          balanceCUs={balanceCUs} 
          brpStatsByRE={brpStatsByRE} 
          onSelectCU={onSelectCU}
        />
      )}

      {roles.isRE && (
        <ReRoleView retailCustomers={retailCustomers} onSelectCU={onSelectCU} />
      )}
    </div>
  );
};

