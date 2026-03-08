
import React, { useState } from 'react';
import { pocStyles } from '../styles';
import { Zap, Activity, Shield, Clock, Plus, Filter, Globe, MapPin, TowerControl, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { svkProducts } from '../mockData';

interface Props {
    onSelect: (id: string) => void;
}

export const FirProductTypeList: React.FC<Props> = ({ onSelect }) => {
    const [isHowToExpanded, setIsHowToExpanded] = useState(false);
    return (
        <div style={pocStyles.content}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <div>
                    <h1 style={{...pocStyles.pageTitle, marginBottom: '8px'}}>Product Types</h1>
                    <p style={{color: '#6b778c', fontSize: '0.9rem'}}>Registry of accepted balancing and congestion management products.</p>
                </div>
                <button style={{...pocStyles.actionButton, backgroundColor: '#0052cc', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Plus size={16} /> New Product Type
                </button>
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
                        <div><strong>Product Types:</strong> Available products for the TSO/DSO markets and who the buyer (PO) is.</div>
                    </div>
                )}
            </div>
            <div style={{...pocStyles.section, padding: '16px', display: 'flex', gap: '12px', alignItems: 'center'}}>
                <div style={{display: 'flex', gap: '8px', flex: 1}}>
                    <span style={{...pocStyles.badge, ...pocStyles.badgeBlue}}>TSO Products ({svkProducts.filter(p => p.market.includes('TSO')).length})</span>
                    <span style={{...pocStyles.badge, backgroundColor: '#f9f0ff', color: '#531dab', border: '1px solid #d3adf7'}}>DSO & Local Products ({svkProducts.filter(p => !p.market.includes('TSO')).length})</span>
                </div>
                <button style={{...pocStyles.actionButton, backgroundColor: '#fff', color: '#42526e', border: '1px solid #dfe1e6', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Filter size={16} /> Filter
                </button>
            </div>

            <div style={{...pocStyles.section, padding: 0, overflow: 'hidden'}}>
                <table style={pocStyles.table}>
                    <thead style={{backgroundColor: '#fafbfc'}}>
                        <tr>
                            <th style={{...pocStyles.th, width: '15%'}}>Name</th>
                            <th style={{...pocStyles.th, width: '15%'}}>Market / Operator</th>
                            <th style={{...pocStyles.th, width: '12%'}}>Category</th>
                            <th style={{...pocStyles.th, width: '12%'}}>Activation</th>
                            <th style={{...pocStyles.th, width: '35%'}}>Description</th>
                            <th style={{...pocStyles.th, width: '11%'}}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {svkProducts.map((product, idx) => {
                            const isEon = product.operator === 'E.ON';
                            
                            return (
                                <tr 
                                    key={product.id} 
                                    style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}
                                    onClick={() => onSelect(product.id)}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e6effc'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = idx % 2 === 1 ? '#fafbfc' : '#fff'}
                                >
                                    <td style={{...pocStyles.td, fontWeight: 600, color: '#0052cc'}}>
                                        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                            {product.category === 'Frequency' ? <Activity size={14} color="#0052cc"/> : <Zap size={14} color="#0052cc"/>}
                                            {product.name}
                                        </div>
                                    </td>
                                    <td style={pocStyles.td}>
                                        <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                                            <div style={{display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#172b4d', fontWeight: 500}}>
                                                {product.market.includes('TSO') ? <Globe size={14} color="#0052cc" /> : <TowerControl size={14} color="#4a148c" />}
                                                {product.market}
                                            </div>
                                            <span style={{
                                                ...pocStyles.badge, 
                                                fontSize: '0.6rem', 
                                                width: 'fit-content',
                                                backgroundColor: isEon ? '#ffe6f0' : '#f0f7ff',
                                                color: isEon ? '#c41d7f' : '#0050b3',
                                                border: `1px solid ${isEon ? '#ffadd2' : '#91d5ff'}`
                                            }}>
                                                {product.operator.toUpperCase()}
                                            </span>
                                        </div>
                                    </td>
                                    <td style={pocStyles.td}>
                                        <span style={{
                                            ...pocStyles.badge,
                                            backgroundColor: product.category === 'Frequency' ? '#f3e5f5' : (product.category === 'Energy' ? '#e8f5e9' : '#fff3e0'),
                                            color: product.category === 'Frequency' ? '#4a148c' : (product.category === 'Energy' ? '#1b5e20' : '#e65100'),
                                            fontSize: '0.65rem'
                                        }}>
                                            {product.category}
                                        </span>
                                    </td>
                                    <td style={pocStyles.td}>
                                        <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
                                            <Clock size={12} color="#6b778c"/>
                                            {product.activation}
                                        </div>
                                    </td>
                                    <td style={{...pocStyles.td, fontSize: '0.85rem', color: '#42526e', lineHeight: '1.4'}}>
                                        {product.description}
                                    </td>
                                    <td style={pocStyles.td}>
                                        <span style={{
                                            ...pocStyles.badge, 
                                            ...pocStyles.badgeGreen,
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '4px',
                                            width: 'fit-content'
                                        }}>
                                            <Shield size={12} /> Active
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

