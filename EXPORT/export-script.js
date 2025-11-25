/**
 * Script de Exportação de Leads (Standalone Logic)
 * 
 * Este lógica já está integrada no AdminPage.jsx, mas mantemos aqui para referência
 * ou uso em scripts externos/console.
 */

export const exportLeadsToCSV = (leads) => {
  if (!leads || leads.length === 0) {
    console.warn('No leads to export');
    return;
  }

  const headers = [
    'ID',
    'Nome', 
    'Empresa', 
    'WhatsApp', 
    'Status', 
    'Score Potencial', 
    'Score Captação', 
    'Score Eficiência', 
    'Data Criação',
    'Data Conclusão'
  ];

  const csvRows = [
    headers.join(','),
    ...leads.map(lead => {
      const scores = lead.scores || {};
      return [
        lead.id || lead.leadId,
        `"${lead.name || ''}"`,
        `"${lead.company || ''}"`,
        `"${lead.whatsapp || ''}"`,
        lead.status || 'draft',
        scores.potencial || 0,
        scores.captacao || 0,
        scores.eficiencia || 0,
        `"${lead.createdAt || ''}"`,
        `"${lead.completedAt || ''}"`
      ].join(',');
    })
  ];

  const csvContent = csvRows.join('\n');
  
  // Browser download trigger
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `leads_export_${new Date().getTime()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  return csvContent;
};
