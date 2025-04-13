export function formatRelativeDate(dateString) {
    if (!dateString) return 'Data não disponível';
  
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
  
    // Menos de 1 minuto: "Agora"
    if (diffInSeconds < 60) {
      return 'Agora';
    }
  
    // Menos de 1 hora: "Há X minutos"
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `Há ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`;
    }
  
    // Menos de 24 horas: "Há X horas"
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `Há ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    }
  
    // Mesmo dia: "Hoje, HH:mm"
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
    if (isToday) {
      return `Hoje, ${date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    }
  
    // Dia anterior: "Ontem, HH:mm"
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday =
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();
    if (isYesterday) {
      return `Ontem, ${date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    }
  
    // Outros dias: "DD/MM, HH:mm"
    return `${date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    })}, ${date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  }