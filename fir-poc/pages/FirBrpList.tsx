
import React, { useState, useMemo } from 'react';
import { pocStyles } from '../styles';
import { Users, Search, Filter, Globe, ChevronLeft, ChevronRight, Briefcase, Zap, TowerControl, UserPlus, ShieldCheck, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { mockDSOs, mockREs, mockBRPs, mockBSPs, mockSPs, mockRegResponsibles } from '../mockData';

const PAGE_SIZE = 20;

interface Props {
  onSelect: (name: string) => void;
}

export const FirBrpList: React.FC<Props> = ({ onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [isHowToExpanded, setIsHowToExpanded] = useState(false);

    const processedBRPs = useMemo(() => {
        return mockBRPs.map(brp => {
            const name = brp.name;
            return {
                ...brp,
                isREG: mockRegResponsibles.some(r => r.name === name),
                isSP: mockSPs.some(s => s.name === name),
                isRE: mockREs.some(r => r.name === name),
                isBSP: mockBSPs.some(s => s.name === name),
                isDSO: mockDSOs.some(d => d.name === name),
                isBRP: true
            };
        }).sort((a, b) => a.name.localeCompare(b.name));
    }, []);

    const filteredBRPs = useMemo(() => {
        const lower = searchTerm.toLowerCase();
        return processedBRPs.filter(brp => 
            brp.name.toLowerCase().includes(lower) || 
            brp.code.toLowerCase().includes(lower) ||
            brp.businessId.toLowerCase().includes(lower)
        );
    }, [searchTerm, processedBRPs]);

    const totalPages = Math.ceil(filteredBRPs.length / PAGE_SIZE);
    const pagedItems = filteredBRPs.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

    const handleSearch = (val: string) => {
        setSearchTerm(val);
        setCurrentPage(0);
    };

    return (
        <div style={pocStyles.content}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <div>
                    <h1 style={{...pocStyles.pageTitle, marginBottom: '8px'}}>Balance Responsible Parties (BRP)</h1>
                    <p style={{color: '#6b778c', fontSize: '0.9rem'}}>Registry of parties responsible for maintaining physical balance in the Swedish power grid.</p>
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
                    <div style={{display: 'grid', gap: '6px', fontSize: '0.9rem', color: '#172b4d', lineHeight: '1.55', marginTop: '14px'}}>
                        <div>This page is a filtered subset of <strong>Global Parties Overview</strong> and shows only actors that have the <strong>Balance Responsible Party (BRP)</strong> role.</div>
                        <div><strong>BRP Name:</strong> Legal entity name. Click the name to open party details.</div>
                        <div><strong>Identified Roles:</strong> All detected roles for the same actor.</div>
                        <div><strong>BRP Code:</strong> Balance responsibility identifier used in balancing and settlement processes.</div>
                        <div><strong>Business ID / OrgNr:</strong> Registered legal organization identifier.</div>
                        <div><strong>Country:</strong> Registered country for the actor.</div>
                        <div><strong>Status:</strong> Current status in the party registry.</div>
                    </div>
                )}
            </div>
            <div style={{...pocStyles.section, padding: '16px', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px'}}>
                <div style={{position: 'relative', flex: 1}}>
                    <Search size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b778c'}} />
                    <input 
                        type="text" 
                        placeholder="Search by name, code or Business ID..." 
                        style={{
                            width: '100%', padding: '10px 10px 10px 40px', borderRadius: '4px', border: '1px solid #dfe1e6', fontSize: '0.9rem', outline: 'none'
                        }} 
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
                <button style={{...pocStyles.actionButton, backgroundColor: '#fff', color: '#42526e', border: '1px solid #dfe1e6', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Filter size={16} /> Filter
                </button>
            </div>

            <div style={{...pocStyles.section, padding: 0, overflow: 'hidden'}}>
                <table style={pocStyles.table}>
                    <thead style={{backgroundColor: '#fafbfc'}}>
                        <tr>
                            <th style={pocStyles.th}>BRP Name</th>
                            <th style={{...pocStyles.th, width: '35%'}}>Identified Roles</th>
                            <th style={pocStyles.th}>BRP Code</th>
                            <th style={pocStyles.th}>Business ID / OrgNr</th>
                            <th style={pocStyles.th}>Country</th>
                            <th style={pocStyles.th}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedItems.map((brp, idx) => (
                            <tr 
                                key={idx} 
                                style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}
                                onClick={() => onSelect(brp.name)}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f4f7fb'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = idx % 2 === 1 ? '#fafbfc' : '#fff'}
                            >
                                <td style={{...pocStyles.td, fontWeight: 600}}>
                                    <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                                        <Users size={16} color="#4b2c85" />
                                        <span style={{ color: '#0052cc', cursor: 'pointer', textDecoration: 'underline' }}>
                                            {brp.name}
                                        </span>
                                    </div>
                                </td>
                                <td style={pocStyles.td}>
                                    <div style={{display:'flex', gap:'4px', flexWrap: 'wrap'}}>
                                        <span style={{...pocStyles.badge, backgroundColor: '#e8f5e9', color: '#1b5e20', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem'}} title="Balance Responsible">
                                            <Briefcase size={10} /> BRP
                                        </span>
                                        {brp.isBSP && <span style={{...pocStyles.badge, backgroundColor: '#deebff', color: '#0747a6', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem'}} title="Balance Service Provider"><Briefcase size={10} /> BSP</span>}
                                        {brp.isSP && <span style={{...pocStyles.badge, backgroundColor: '#e6fffa', color: '#006d5b', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem'}} title="Service Provider"><ShieldCheck size={10} /> SP</span>}
                                        {brp.isRE && <span style={{...pocStyles.badge, backgroundColor: '#fff3e0', color: '#e65100', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem'}} title="Retailer"><Zap size={10} /> RE</span>}
                                        {brp.isREG && <span style={{...pocStyles.badge, backgroundColor: '#f3e5f5', color: '#4a148c', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem'}} title="Registration Responsible"><UserPlus size={10} /> CU REG RESP</span>}
                                        {brp.isDSO && <span style={{...pocStyles.badge, backgroundColor: '#f3e5f5', color: '#4a148c', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem'}} title="DSO"><TowerControl size={10} /> DSO</span>}
                                    </div>
                                </td>
                                <td style={{...pocStyles.td, fontFamily: 'monospace'}}>{brp.code}</td>
                                <td style={{...pocStyles.td, color: '#42526e', fontSize: '0.85rem'}}>{brp.businessId}</td>
                                <td style={pocStyles.td}>
                                    <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
                                        <Globe size={14} color="#6b778c" />
                                        {brp.country}
                                    </div>
                                </td>
                                <td style={pocStyles.td}>
                                    <span style={{...pocStyles.badge, ...pocStyles.badgeGreen}}>Active</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #ebecf0', backgroundColor: '#fafbfc'}}>
                    <span style={{fontSize: '0.85rem', color: '#6b778c'}}>Showing {pagedItems.length} of {filteredBRPs.length} parties</span>
                    <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                        <button disabled={currentPage === 0} onClick={() => setCurrentPage(p => p - 1)} style={{padding: '6px', borderRadius: '4px', border: '1px solid #dfe1e6', backgroundColor: currentPage === 0 ? '#f4f5f7' : '#fff', cursor: currentPage === 0 ? 'not-allowed' : 'pointer'}}>
                            <ChevronLeft size={16} color={currentPage === 0 ? '#a5adba' : '#42526e'} />
                        </button>
                        <span style={{fontSize: '0.85rem', fontWeight: 600, color: '#172b4d', margin: '0 8px'}}>Page {currentPage + 1} of {totalPages || 1}</span>
                        <button disabled={currentPage >= totalPages - 1} onClick={() => setCurrentPage(p => p + 1)} style={{padding: '6px', borderRadius: '4px', border: '1px solid #dfe1e6', backgroundColor: currentPage >= totalPages - 1 ? '#f4f5f7' : '#fff', cursor: currentPage >= totalPages - 1 ? 'not-allowed' : 'pointer'}}>
                            <ChevronRight size={16} color={currentPage >= totalPages - 1 ? '#a5adba' : '#42526e'} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

