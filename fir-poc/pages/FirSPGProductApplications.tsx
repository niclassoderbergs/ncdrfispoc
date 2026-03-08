import React, { useMemo, useState } from 'react';
import { pocStyles } from '../styles';
import { Search, Filter, Plus, Activity, Zap, CheckCircle2, Link2, Clock, FileX, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { mockSPGProductApplications } from '../mockData';

interface Props {
    onSelectSPG: (id: string) => void;
}

export const FirSPGProductApplications: React.FC<Props> = ({ onSelectSPG }) => {
    const [isHowToExpanded, setIsHowToExpanded] = useState(false);
    
    const ongoingApplications = useMemo(() => 
        mockSPGProductApplications.filter(app => app.status !== 'Approved')
    , []);

    const approvedApplications = useMemo(() => 
        mockSPGProductApplications.filter(app => app.status === 'Approved')
    , []);

    const getPhaseBadge = (status: string) => {
        if (status === 'Approved') return { bg: '#e3fcef', color: '#006644', icon: <CheckCircle2 size={12} /> };
        if (status === 'Rejected') return { bg: '#ffebe6', color: '#bf2600', icon: <FileX size={12} /> };
        if (status === 'Technical Testing' || status === 'Ready for Activation Test') return { bg: '#e6effc', color: '#0052cc', icon: <Activity size={12} /> };
        return { bg: '#fff0b3', color: '#974f0c', icon: <Clock size={12} /> };
    };

    const renderApplicationTable = (apps: typeof mockSPGProductApplications, isApproved: boolean) => (
        <div style={{...pocStyles.section, padding: 0, overflow: 'hidden', marginBottom: isApproved ? '0' : '48px'}}>
            <table style={pocStyles.table}>
                <thead style={{backgroundColor: '#fafbfc'}}>
                    <tr>
                        <th style={pocStyles.th}>ID</th>
                        <th style={pocStyles.th}>Group (SPG)</th>
                        <th style={pocStyles.th}>Product</th>
                        <th style={pocStyles.th}>Applied</th>
                        <th style={pocStyles.th}>Phase</th>
                        <th style={pocStyles.th}>Progress</th>
                        <th style={pocStyles.th}></th>
                    </tr>
                </thead>
                <tbody>
                    {apps.map((app, idx) => {
                        const badge = getPhaseBadge(app.status);
                        const isRejected = app.status === 'Rejected';
                        return (
                            <tr 
                                key={app.id} 
                                style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}
                            >
                                <td style={{...pocStyles.td, fontWeight: 600, color: '#0052cc'}}>{app.id}</td>
                                <td style={pocStyles.td}>
                                    <div 
                                        style={{display:'flex', flexDirection:'column', cursor: 'pointer', color: '#0052cc'}}
                                        onClick={() => onSelectSPG(app.spgId)}
                                        onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                                        onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                                    >
                                        <div style={{display:'flex', alignItems:'center', gap:'4px'}}>
                                            <Link2 size={12} />
                                            <span style={{fontWeight: 600}}>{app.spgName}</span>
                                        </div>
                                        <span style={{fontSize: '0.75rem', color: '#6b778c', paddingLeft: '16px'}}>ID: {app.spgId}</span>
                                    </div>
                                </td>
                                <td style={pocStyles.td}>
                                    <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
                                        <Zap size={14} color="#d97706" />
                                        <span style={{fontWeight: 700}}>{app.product}</span>
                                    </div>
                                </td>
                                <td style={pocStyles.td}>{app.appliedDate}</td>
                                <td style={pocStyles.td}>
                                    <span style={{
                                        ...pocStyles.badge, 
                                        backgroundColor: badge.bg, 
                                        color: badge.color,
                                        fontSize: '0.75rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        width: 'fit-content'
                                    }}>
                                        {badge.icon} {app.status}
                                    </span>
                                </td>
                                <td style={pocStyles.td}>
                                    <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                                        <div style={{flex: 1, height: '6px', backgroundColor: '#ebecf0', borderRadius: '3px', width: '60px'}}>
                                            <div style={{
                                                width: `${app.progress}%`, 
                                                height: '100%', 
                                                backgroundColor: isRejected ? '#bf2600' : (app.status === 'Approved' ? '#36b37e' : '#0052cc'), 
                                                borderRadius: '3px'
                                            }}></div>
                                        </div>
                                        <span style={{fontSize:'0.75rem', fontWeight: 600}}>{app.progress}%</span>
                                    </div>
                                </td>
                                <td style={{...pocStyles.td, textAlign: 'right'}}>
                                    <button style={{border: 'none', background: 'none', color: '#0052cc', cursor: 'pointer', fontWeight: 600}}>
                                        {isApproved ? 'View Certificate' : (isRejected ? 'View Reason' : 'Process')}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    {apps.length === 0 && (
                        <tr>
                            <td colSpan={7} style={{...pocStyles.td, textAlign: 'center', padding: '32px', color: '#6b778c', fontStyle: 'italic'}}>
                                No applications found in this category.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <div style={pocStyles.content}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <div>
                    <h1 style={{...pocStyles.pageTitle, marginBottom: '8px'}}>SPG Product Applications</h1>
                    <p style={{color: '#6b778c', fontSize: '0.9rem'}}>Market qualification pipeline for aggregate groups.</p>
                </div>
                <button style={{...pocStyles.actionButton, backgroundColor: '#0052cc', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Plus size={16} /> New Product Application
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
                        <div>This page shows the qualification process for Service Provider Groups (SPGs) applying to deliver specific market products.</div>
                        <div><strong>Process flow in FIS:</strong> The application is sent to the relevant DSO/TSO that the SP/BSP applies to for SPG prequalification. The technical prequalification is then handled directly between the DSO/TSO and the SP/BSP, and the DSO/TSO updates the prequalification status in FIS.</div>
                        <div><strong>ID:</strong> Unique application reference for the qualification case.</div>
                        <div><strong>Group (SPG):</strong> Shows the applying SPG. Click the group name to open SPG details.</div>
                        <div><strong>Product:</strong> The specific product being qualified (for example mFRR or FCR).</div>
                        <div><strong>Applied:</strong> Date when the product qualification application was submitted.</div>
                        <div><strong>Phase:</strong> Current qualification status.</div>
                        <div><strong>Technical Testing / Ready for Activation Test:</strong> Technical verification or activation tests are ongoing to ensure the group can deliver according to requirements.</div>
                        <div><strong>Approved:</strong> The group is fully qualified for the product.</div>
                        <div><strong>Rejected:</strong> Qualification failed.</div>
                        <div><strong>Progress:</strong> Visual indicator (0-100%) showing completion for the current phase.</div>
                        <div><strong>Action:</strong> Opens the relevant step, for example <strong>Process</strong>, <strong>View Reason</strong>, or <strong>View Certificate</strong>.</div>
                        <div><strong>Sections:</strong> <strong>Ongoing &amp; Evaluated Qualifications</strong> shows active/non-approved cases. <strong>Historical Approvals</strong> shows approved product qualifications.</div>
                        <div><strong>System Role:</strong> FIS acts as coordinator for these prequalification workflows.</div>
                    </div>
                )}
            </div>
            <div style={{...pocStyles.section, padding: '16px', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '32px'}}>
                <div style={{position: 'relative', flex: 1}}>
                    <Search size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b778c'}} />
                    <input 
                        type="text" 
                        placeholder="Search applications..." 
                        style={{
                            width: '100%', padding: '10px 10px 10px 40px', borderRadius: '4px', border: '1px solid #dfe1e6', fontSize: '0.9rem', outline: 'none'
                        }} 
                    />
                </div>
                <button style={{...pocStyles.actionButton, backgroundColor: '#fff', color: '#42526e', border: '1px solid #dfe1e6', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Filter size={16} /> Filter
                </button>
            </div>

            {/* SECTION 1: ONGOING */}
            <div style={{marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Clock size={20} color="#0052cc" />
                <h2 style={{fontSize: '1.2rem', fontWeight: 700, margin: 0}}>Ongoing & Evaluated Qualifications</h2>
                <span style={{...pocStyles.badge, ...pocStyles.badgeBlue, marginLeft: '8px'}}>{ongoingApplications.length}</span>
            </div>
            {renderApplicationTable(ongoingApplications, false)}

            {/* SECTION 2: APPROVED */}
            <div style={{marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <CheckCircle2 size={20} color="#006644" />
                <h2 style={{fontSize: '1.2rem', fontWeight: 700, margin: 0}}>Historical Approvals</h2>
                <span style={{...pocStyles.badge, ...pocStyles.badgeGreen, marginLeft: '8px'}}>{approvedApplications.length}</span>
            </div>
            {renderApplicationTable(approvedApplications, true)}

        </div>
    );
};






