
import React, { useState, useCallback, useMemo } from 'react';
import { pocStyles } from '../styles';
import { Menu, ArrowLeft } from 'lucide-react';
import { FirSidebar, PocView } from '../FirSidebar';
import { FirDashboard } from './FirDashboard';
import { FirCUList } from './FirCUList';
import { FirCUDetail } from './FirCUDetail';
import { FirSPGList } from './FirSPGList';
import { FirSPGDetail } from './FirSPGDetail';
import { FirGenericList } from './FirGenericList';
import { FirPrequalificationList } from './FirPrequalificationList';
import { FirGridConstraintsList } from './FirGridConstraintsList';
import { FirGridConstraintDetail } from './FirGridConstraintDetail';
import { FirPartiesList } from './FirPartiesList';
import { FirBspList } from './FirBspList';
import { FirSpList } from './FirSpList';
import { FirDsoList } from './FirDsoList';
import { FirReList } from './FirReList';
import { FirBrpList } from './FirBrpList';
import { FirRegResponsibleList } from './FirRegResponsibleList';
import { FirPartyDetail } from './FirPartyDetail';
import { FirProductTypeList } from './FirProductTypeList';
import { FirProductDetail } from './FirProductDetail';
import { FirServiceProviderApplications } from './FirServiceProviderApplications';
import { FirSPGProductApplications } from './FirSPGProductApplications';
import { FirBaselineList } from './FirBaselineList';
import { FirLocalMarketList } from './FirLocalMarketList';
import { FirLocalMarketDetail } from './FirLocalMarketDetail';
import { FirBidsReceived } from './FirBidsReceived';
import { FirBidsActivated } from './FirBidsActivated';
import { FirVerificationList } from './FirVerificationList';
import { FirVerificationDetail } from './FirVerificationDetail';
import { FirBspSettlement } from './FirBspSettlement';
import { FirBrpSettlement } from './FirBrpSettlement';
import { FirReSettlement } from './FirReSettlement';
import { FirLocalFlexSettlement } from './FirLocalFlexSettlement';
import { 
  mockCUs, 
  CU, 
  mockBids, 
  mockSPGs, 
  mockDSOs, 
  mockREs, 
  mockBRPs, 
  mockBSPs, 
  svkProducts, 
  mockGridConstraints,
  mockSPs,
  mockRegResponsibles 
} from '../mockData';

interface NavigationState {
    view: PocView;
    cu: CU | null;
    spgId: string | null;
    party: string | null;
    product: string | null;
    constraint: string | null;
    bidId: string | null;
    localMarketId: string | null;
}

const getAdjacentItems = <T,>(
  items: T[],
  selectedId: string | null,
  getId: (item: T) => string
): { prev: T | null; next: T | null } => {
  if (!selectedId) return { prev: null, next: null };
  const index = items.findIndex(item => getId(item) === selectedId);
  if (index < 0) return { prev: null, next: null };

  return {
    prev: index > 0 ? items[index - 1] : null,
    next: index < items.length - 1 ? items[index + 1] : null
  };
};

export const FirGuiPocPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<PocView>('dashboard'); 
  const [selectedCU, setSelectedCU] = useState<CU | null>(null); 
  const [selectedSpgId, setSelectedSpgId] = useState<string | null>(null);
  const [selectedPartyName, setSelectedPartyName] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedConstraintId, setSelectedConstraintId] = useState<string | null>(null);
  const [selectedBidId, setSelectedBidId] = useState<string | null>(null);
  const [selectedLocalMarketId, setSelectedLocalMarketId] = useState<string | null>(null);
  
  const [history, setHistory] = useState<NavigationState[]>([]);

  const pushHistory = useCallback(() => {
    setHistory(prev => [...prev, {
        view: currentView,
        cu: selectedCU,
        spgId: selectedSpgId,
        party: selectedPartyName,
        product: selectedProductId,
        constraint: selectedConstraintId,
        bidId: selectedBidId,
        localMarketId: selectedLocalMarketId
    }]);
  }, [currentView, selectedCU, selectedSpgId, selectedPartyName, selectedProductId, selectedConstraintId, selectedBidId, selectedLocalMarketId]);

  const handleGoBack = useCallback(() => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setCurrentView(previous.view);
    setSelectedCU(previous.cu);
    setSelectedSpgId(previous.spgId);
    setSelectedPartyName(previous.party);
    setSelectedProductId(previous.product);
    setSelectedConstraintId(previous.constraint);
    setSelectedBidId(previous.bidId);
    setSelectedLocalMarketId(previous.localMarketId);
  }, [history]);

  const handleNavigate = useCallback((view: PocView) => {
    pushHistory();
    setCurrentView(view);
    setSelectedCU(null); 
    setSelectedSpgId(null);
    setSelectedPartyName(null);
    setSelectedProductId(null);
    setSelectedConstraintId(null);
    setSelectedBidId(null);
    setSelectedLocalMarketId(null);
  }, [pushHistory]);

  const handleSelectCU = useCallback((id: string) => {
    const cu = mockCUs.find(c => c.id === id);
    if (cu) {
        pushHistory();
        setSelectedCU(cu);
        setCurrentView('cus');
        setSelectedBidId(null);
    }
  }, [pushHistory]);

  const handleSelectSPG = useCallback((id: string) => {
    pushHistory();
    setSelectedSpgId(id);
    setCurrentView('spgs');
    setSelectedBidId(null);
  }, [pushHistory]);

  const handleSelectParty = useCallback((name: string) => {
    pushHistory();
    setSelectedPartyName(name);
    // Bevara roll-specifik kontext om möjligt
    if (!['dsos', 'res', 'brps', 'bsp', 'sp', 'reg_responsible', 'parties', 'overview'].includes(currentView)) {
        setCurrentView('parties');
    }
  }, [currentView, pushHistory]);

  const handleSelectProduct = useCallback((id: string) => {
    pushHistory();
    setSelectedProductId(id);
    setCurrentView('prod_types');
  }, [pushHistory]);

  const handleSelectConstraint = useCallback((id: string) => {
    pushHistory();
    setSelectedConstraintId(id);
    setCurrentView('grid_constraint_detail');
  }, [pushHistory]);

  const handleSelectBid = useCallback((id: string) => {
    pushHistory();
    setSelectedBidId(id);
    setCurrentView('verification');
  }, [pushHistory]);

  const handleSelectLocalMarket = useCallback((id: string) => {
    pushHistory();
    setSelectedLocalMarketId(id);
    setCurrentView('local_market_detail');
  }, [pushHistory]);

  const sortedCUs = useMemo(() => [...mockCUs].sort((a, b) => a.id.localeCompare(b.id)), []);
  const sortedSPGs = useMemo(() => [...mockSPGs].sort((a, b) => a.id.localeCompare(b.id)), []);
  const sortedProducts = useMemo(() => [...svkProducts].sort((a, b) => a.id.localeCompare(b.id)), []);
  const sortedConstraints = useMemo(() => [...mockGridConstraints].sort((a, b) => a.id.localeCompare(b.id)), []);

  const partyNamesForView = useMemo(() => {
    const uniqueSorted = (names: string[]) => [...new Set(names)].sort((a, b) => a.localeCompare(b));

    switch (currentView) {
      case 'dsos':
        return uniqueSorted(mockDSOs.map(d => d.name));
      case 'res':
        return uniqueSorted(mockREs.map(r => r.name));
      case 'brps':
        return uniqueSorted(mockBRPs.map(b => b.name));
      case 'bsp':
        return uniqueSorted(mockBSPs.map(b => b.name));
      case 'sp':
        return uniqueSorted(mockSPs.map(s => s.name));
      case 'reg_responsible':
        return uniqueSorted(mockRegResponsibles.map(r => r.name));
      default:
        return uniqueSorted([
          ...mockDSOs.map(d => d.name),
          ...mockREs.map(r => r.name),
          ...mockBRPs.map(b => b.name),
          ...mockBSPs.map(b => b.name),
          ...mockSPs.map(s => s.name),
          ...mockRegResponsibles.map(r => r.name),
          ...mockCUs.map(c => c.registrationResponsible)
        ]);
    }
  }, [currentView]);

  const cuAdjacency = useMemo(
    () => getAdjacentItems(sortedCUs, selectedCU?.id ?? null, cu => cu.id),
    [sortedCUs, selectedCU]
  );
  const spgAdjacency = useMemo(
    () => getAdjacentItems(sortedSPGs, selectedSpgId, spg => spg.id),
    [sortedSPGs, selectedSpgId]
  );
  const productAdjacency = useMemo(
    () => getAdjacentItems(sortedProducts, selectedProductId, product => product.id),
    [sortedProducts, selectedProductId]
  );
  const constraintAdjacency = useMemo(
    () => getAdjacentItems(sortedConstraints, selectedConstraintId, constraint => constraint.id),
    [sortedConstraints, selectedConstraintId]
  );

  const selectedPartyIndex = selectedPartyName ? partyNamesForView.indexOf(selectedPartyName) : -1;
  const prevPartyName = selectedPartyIndex > 0 ? partyNamesForView[selectedPartyIndex - 1] : null;
  const nextPartyName =
    selectedPartyIndex >= 0 && selectedPartyIndex < partyNamesForView.length - 1
      ? partyNamesForView[selectedPartyIndex + 1]
      : null;

  // --- RENDERING ---
  const renderContent = () => {
    // 1. Check Detail views first (if applicable)
    if (selectedLocalMarketId && currentView === 'local_market_detail') {
        return <FirLocalMarketDetail id={selectedLocalMarketId} onBack={handleGoBack} />;
    }
    if (selectedCU && currentView === 'cus') {
        return <FirCUDetail cu={selectedCU} prevCU={cuAdjacency.prev} nextCU={cuAdjacency.next} onSelectCU={handleSelectCU} onBack={handleGoBack} onNavigateToGroup={handleSelectSPG} onSelectParty={handleSelectParty} onSelectBid={handleSelectBid} />;
    }
    if (selectedSpgId && currentView === 'spgs') {
        return <FirSPGDetail id={selectedSpgId} prevSpg={spgAdjacency.prev} nextSpg={spgAdjacency.next} onSelectSPG={handleSelectSPG} onBack={handleGoBack} onSelectCU={handleSelectCU} onSelectBid={handleSelectBid} />;
    }
    if (selectedPartyName && ['parties', 'overview', 'bsp', 'sp', 'dsos', 'res', 'brps', 'reg_responsible'].includes(currentView)) {
        return <FirPartyDetail partyName={selectedPartyName} prevParty={prevPartyName} nextParty={nextPartyName} onSelectParty={handleSelectParty} onBack={handleGoBack} onSelectCU={handleSelectCU} onSelectSPG={handleSelectSPG} />;
    }
    if (selectedProductId && currentView === 'prod_types') {
        return <FirProductDetail productId={selectedProductId} prevProduct={productAdjacency.prev} nextProduct={productAdjacency.next} onSelectProduct={handleSelectProduct} onBack={handleGoBack} onNavigateToGroup={handleSelectSPG} onSelectParty={handleSelectParty} onSelectBid={handleSelectBid} />;
    }
    if (selectedConstraintId && currentView === 'grid_constraint_detail') {
        return <FirGridConstraintDetail id={selectedConstraintId} prevConstraint={constraintAdjacency.prev} nextConstraint={constraintAdjacency.next} onSelectConstraint={handleSelectConstraint} onBack={handleGoBack} onSelectCU={handleSelectCU} onSelectSPG={handleSelectSPG} />;
    }
    if (selectedBidId && currentView === 'verification') {
        return <FirVerificationDetail bidId={selectedBidId} onBack={handleGoBack} onSelectCU={handleSelectCU} onSelectSPG={handleSelectSPG} onSelectBid={handleSelectBid} />;
    }

    // 2. Main Routing Switch
    switch (currentView) {
        case 'dashboard': return <FirDashboard onNavigate={handleNavigate} />;
        case 'cus': return <FirCUList onSelect={handleSelectCU} onSelectSPG={handleSelectSPG} onSelectParty={handleSelectParty} onNavigateToParties={() => handleNavigate('parties')} />;
        case 'spgs': return <FirSPGList onSelect={handleSelectSPG} />;
        case 'bids_received': return <FirBidsReceived onSelectBid={handleSelectBid} onSelectSPG={handleSelectSPG} onSelectParty={handleSelectParty} />;
        case 'bids_activated': return <FirBidsActivated onSelectBid={handleSelectBid} onSelectSPG={handleSelectSPG} onSelectParty={handleSelectParty} />;
        case 'verification': return <FirVerificationList onSelectBid={handleSelectBid} onSelectSPG={handleSelectSPG} onSelectParty={handleSelectParty} />;
        case 'settlement_result': return <FirBspSettlement onSelectBid={handleSelectBid} onSelectParty={handleSelectParty} />;
        case 'brp_settlement': return <FirBrpSettlement onSelectBid={handleSelectBid} onSelectParty={handleSelectParty} />;
        case 're_settlement': return <FirReSettlement onSelectBid={handleSelectBid} onSelectParty={handleSelectParty} />;
        case 'local_flex_settlement': return <FirLocalFlexSettlement onSelectBid={handleSelectBid} onSelectParty={handleSelectParty} />;
        case 'bsp': return <FirBspList onSelect={handleSelectParty} />;
        case 'sp': return <FirSpList onSelect={handleSelectParty} />;
        case 'reg_responsible': return <FirRegResponsibleList onSelect={handleSelectParty} />;
        case 'dsos': return <FirDsoList onSelect={handleSelectParty} />;
        case 'res': return <FirReList onSelect={handleSelectParty} />;
        case 'brps': return <FirBrpList onSelect={handleSelectParty} />;
        case 'parties':
        case 'overview': return <FirPartiesList onSelect={handleSelectParty} />;
        case 'prod_types': return <FirProductTypeList onSelect={handleSelectProduct} />;
        case 'prequalification': return <FirPrequalificationList onSelect={handleSelectCU} />;
        case 'grid_constraints': return <FirGridConstraintsList onSelect={handleSelectConstraint} />;
        case 'sp_applications': return <FirServiceProviderApplications />;
        case 'spg_applications': return <FirSPGProductApplications onSelectSPG={handleSelectSPG} />;
        case 'baselines': return <FirBaselineList />;
        case 'local_markets': return <FirLocalMarketList onSelect={handleSelectLocalMarket} />;
        default: return <FirGenericList title={currentView} />;
    }
  };

  const getPageTitle = () => {
    if (selectedLocalMarketId && currentView === 'local_market_detail') return `Local Market: ${selectedLocalMarketId}`;
    if (selectedCU && currentView === 'cus') return `Controllable unit ${selectedCU.id}`;
    if (selectedSpgId && currentView === 'spgs') return `SPG ${selectedSpgId}`;
    if (selectedPartyName) return `Party: ${selectedPartyName}`;
    if (selectedProductId && currentView === 'prod_types') return `Product: ${selectedProductId}`;
    if (selectedConstraintId && currentView === 'grid_constraint_detail') return `Grid Constraint ${selectedConstraintId}`;
    if (selectedBidId && currentView === 'verification') return `Verification: ${selectedBidId}`;
    
    switch(currentView) {
        case 'local_flex_settlement': return 'Local Flex Settlement (DSO)';
        case 'local_markets': return 'Local Markets';
        case 'parties': return 'Global Parties Overview';
        case 'cus': return 'Controllable Units';
        case 'dashboard': return 'System Dashboard';
        default: return 'Flexibility Information System Portal';
    }
  };

  return (
    <div style={pocStyles.layout}> 
      <FirSidebar currentView={currentView} onNavigate={handleNavigate} />
      <div style={pocStyles.main}>
        <div style={pocStyles.topBar}>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            {history.length > 0 && (
                <button 
                    onClick={handleGoBack}
                    style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        color: 'white',
                        marginRight: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 600
                    }}
                >
                    <ArrowLeft size={16} />
                    <span>Back</span>
                </button>
            )}
            <Menu size={20} style={{cursor: 'pointer', opacity: history.length > 0 ? 0.7 : 1}} />
            <span style={{fontWeight: 600, letterSpacing: '0.5px', marginLeft: '8px'}}>
                {getPageTitle()}
            </span>
          </div>
          <div style={{display: 'flex', gap: '12px'}}>
             <button style={pocStyles.actionButton}>Registry Admin</button>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};


