import React, { useState } from 'react';
import { pocStyles } from '../styles';
import { Search, Filter, Plus, Clock, AlertTriangle, CheckCircle2, FileX, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { mockSPApplications } from '../mockData';

export const FirServiceProviderApplications: React.FC = () => {
    const [isHowToExpanded, setIsHowToExpanded] = useState(false);
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Active':
                return { bg: '#e3fcef', color: '#006644', icon: <CheckCircle2 size={12} /> };
            case 'Rejected':
                return { bg: '#ffebe6', color: '#bf2600', icon: <FileX size={12} /> };
            case 'Review':
                return { bg: '#deebff', color: '#0747a6', icon: <Clock size={12} /> };
            case 'Pending Documents':
                return { bg: '#fff0b3', color: '#974f0c', icon: <AlertTriangle size={12} /> };
            default:
                return { bg: '#ebecf0', color: '#42526e', icon: <Clock size={12} /> };
        }
    };

    return (
        <div style={pocStyles.content}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <div>
                    <h1 style={{...pocStyles.pageTitle, marginBottom: '8px'}}>Service Provider Applications</h1>
                    <p style={{color: '#6b778c', fontSize: '0.9rem'}}>Onboarding queue for new market actors (SP/BSP).</p>
                </div>
                <button style={{...pocStyles.actionButton, backgroundColor: '#0052cc', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Plus size={16} /> New Application
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
                        <div>This view shows the onboarding queue for new market actors (Service Providers and Balance Service Providers) that want to connect to FIS.</div>
                        <div><strong>Application Routing:</strong> Each application is sent to the relevant DSO/TSO that the SP/BSP is applying to.</div>
                        <div><strong>Application ID:</strong> Unique application reference for each onboarding case.</div>
                        <div><strong>Company Name:</strong> Name of the applying company. The organization number is shown below the name in the same column.</div>
                        <div><strong>Type:</strong> Indicates whether the application is for Service Provider (SP), Balance Service Provider (BSP), or a combined role.</div>
                        <div><strong>Applied Date:</strong> Date when the application was submitted.</div>
                        <div><strong>Status:</strong> Current processing state.</div>
                        <div><strong>Review:</strong> The application is currently under internal review.</div>
                        <div><strong>Pending Documents:</strong> Additional documentation is required from the applicant.</div>
                        <div><strong>Rejected:</strong> The application has been rejected.</div>
                        <div><strong>Active:</strong> The actor is approved and has an active profile in the system.</div>
                        <div><strong>Action:</strong> Opens the next workflow step, for example <strong>Process</strong> or <strong>View Profile</strong>.</div>
                        <div><strong>System Role:</strong> FIS (Flexibility Information System) coordinates and tracks application status. Administrative processing may happen in external systems, but FIS is the central source for actor status and market permissions.</div>
                    </div>
                )}
            </div>
            <div style={{...pocStyles.section, padding: '16px', display: 'flex', gap: '12px', alignItems: 'center'}}>
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

            <div style={{...pocStyles.section, padding: 0, overflow: 'hidden'}}>
                <table style={pocStyles.table}>
                    <thead style={{backgroundColor: '#fafbfc'}}>
                        <tr>
                            <th style={pocStyles.th}>Application ID</th>
                            <th style={pocStyles.th}>Company Name</th>
                            <th style={pocStyles.th}>Type</th>
                            <th style={pocStyles.th}>Applied Date</th>
                            <th style={pocStyles.th}>Status</th>
                            <th style={{...pocStyles.th, textAlign: 'right'}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockSPApplications.map((app, idx) => {
                            const badge = getStatusBadge(app.status);
                            return (
                                <tr 
                                    key={app.id} 
                                    style={{...pocStyles.row, backgroundColor: idx % 2 === 1 ? '#fafbfc' : '#fff'}}
                                >
                                    <td style={{...pocStyles.td, fontWeight: 600, color: '#0052cc'}}>{app.id}</td>
                                    <td style={pocStyles.td}>
                                        <div style={{display:'flex', flexDirection:'column'}}>
                                            <span style={{fontWeight: 500}}>{app.companyName}</span>
                                            <span style={{fontSize: '0.75rem', color: '#6b778c'}}>Org: {app.orgNr}</span>
                                        </div>
                                    </td>
                                    <td style={pocStyles.td}>
                                        <span style={{
                                            ...pocStyles.badge,
                                            backgroundColor: app.type === 'Combined' ? '#f3e5f5' : '#e6effc',
                                            color: app.type === 'Combined' ? '#4a148c' : '#0052cc',
                                        }}>
                                            {app.type}
                                        </span>
                                    </td>
                                    <td style={pocStyles.td}>{app.appliedDate}</td>
                                    <td style={pocStyles.td}>
                                        <span style={{
                                            ...pocStyles.badge, 
                                            backgroundColor: badge.bg, 
                                            color: badge.color, 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '4px',
                                            width: 'fit-content'
                                        }}>
                                            {badge.icon} {app.status}
                                        </span>
                                    </td>
                                    <td style={{...pocStyles.td, textAlign: 'right'}}>
                                        <button style={{border: 'none', background: 'none', color: '#0052cc', cursor: 'pointer', fontWeight: 600}}>
                                            {app.status === 'Active' ? 'View Profile' : 'Process'}
                                        </button>
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





