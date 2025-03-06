const AppMessages = {
    data() {
      return {
        messageContent: '', // Pour la création de message
        studentId: '', // ID de l'étudiant pour récupérer ses messages
        messages: [], // Liste des messages
        selectedMessageId: '', // ID du message sélectionné pour la mise à jour
        messageUpdateContent: '' // Contenu mis à jour du message
      };
    },
    template: `
      <div>
        <!-- Section Gestion des Messages -->
        <h2>Envoyer un message</h2>
        <input v-model="messageContent" placeholder="Contenu du message">
        <button @click="sendMessage">Envoyer</button>
  
        <h2>Messages d'un étudiant</h2>
        <input v-model="studentId" placeholder="ID de l'étudiant">
        <button @click="fetchMessages">Récupérer les messages</button>
  
        <ul v-if="messages.length">
          <li v-for="message in messages" :key="message.id">
            <p>{{ message.content }}</p>
            <button @click="updateMessageStatus(message.id)">Mettre à jour</button>
          </li>
        </ul>
  
        <h2>Mettre à jour un message</h2>
        <input v-model="messageUpdateContent" placeholder="Nouveau contenu">
        <button @click="updateMessage">Mettre à jour</button>
      </div>
    `,
    methods: {
      // Envoi d'un message
      async sendMessage() {
        if (!this.messageContent) {
          alert('Veuillez entrer un contenu pour le message');
          return;
        }
  
        const messageData = {
          content: this.messageContent
        };
  
        try {
          const response = await fetch('http://localhost:8081/api/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageData)
          });
  
          if (response.ok) {
            alert('Message envoyé avec succès');
            this.messageContent = ''; // Réinitialiser le champ du message
          } else {
            throw new Error('Erreur lors de l\'envoi du message');
          }
        } catch (error) {
          console.error('Erreur:', error);
          alert('Erreur lors de l\'envoi du message');
        }
      },
  
      // Récupération des messages d'un étudiant
      async fetchMessages() {
        if (!this.studentId) {
          alert('Veuillez entrer un ID d\'étudiant');
          return;
        }
  
        try {
          const response = await fetch(`http://localhost:8081/api/messages/etudiants/${this.studentId}`);
          
          if (response.ok) {
            this.messages = await response.json();
          } else {
            throw new Error('Erreur lors de la récupération des messages');
          }
        } catch (error) {
          console.error('Erreur:', error);
          alert('Erreur lors de la récupération des messages');
        }
      },
  
      // Mise à jour du statut d'un message
      async updateMessageStatus(messageId) {
        try {
          const response = await fetch(`http://localhost:8081/api/messages/${messageId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              content: 'Contenu mis à jour' // Exemple de mise à jour
            })
          });
  
          if (response.ok) {
            alert('Message mis à jour');
            this.fetchMessages(); // Rafraîchir les messages
          } else {
            throw new Error('Erreur lors de la mise à jour du message');
          }
        } catch (error) {
          console.error('Erreur:', error);
          alert('Erreur lors de la mise à jour du message');
        }
      },
  
      // Mise à jour d'un message spécifique
      async updateMessage() {
        if (!this.selectedMessageId || !this.messageUpdateContent) {
          alert('Veuillez sélectionner un message et entrer un nouveau contenu');
          return;
        }
  
        try {
          const response = await fetch(`http://localhost:8081/api/messages/${this.selectedMessageId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: this.messageUpdateContent })
          });
  
          if (response.ok) {
            alert('Message mis à jour');
            this.messageUpdateContent = ''; // Réinitialiser le champ
            this.fetchMessages(); // Rafraîchir la liste des messages
          } else {
            throw new Error('Erreur lors de la mise à jour du message');
          }
        } catch (error) {
          console.error('Erreur:', error);
          alert('Erreur lors de la mise à jour du message');
        }
      }
    }
  };

  Vue.createApp(AppMessages).mount('#AppMessages');
  