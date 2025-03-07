<template>
  <div class="flex flex-col bg-base-200 h-[1000px] items-center justify-evenly">
  <!-- Section Gestion des Messages -->
  <div class="max-w-sm card shadow-md bg-base-300">
    <div class="card-body items-center">
      <h2 class="card-title">Envoyer un message</h2>
      <input v-model="studentId" placeholder="Numéro étudiant à envoyer" class="input input-bordered mb-2">
      <input v-model="subject" placeholder="Sujet du message" class="input input-bordered mb-2">
      <input type="text" v-model="messageContent" placeholder="Contenu du message" class="input input-bordered mb-2">
      <button @click="sendMessage" class="btn btn-primary">Envoyer</button>
    </div>
  </div>

  <div class="max-w-sm card shadow-md bg-base-300">
    <div class="card-body items-center">
      <h2 class="card-title">Messages d'un étudiant</h2>
      <input v-model="studentId2" placeholder="ID de l'étudiant" class="input input-bordered">
      <button @click="fetchMessages" class="btn btn-primary">Récupérer les messages</button>
    </div>
  </div>

  <!-- Affichage des messages reçus -->
  <div v-if="messages.length" class="w-full max-w-sm card shadow-md bg-base-100">
    <div class="card-body items-center">
      <h2 class="card-title">Messages reçus</h2>
      <ul class="space-y-4">
        <li v-for="message in messages" :key="message.id" class="p-4 border rounded shadow-sm">
          <p><strong>ID :</strong> {{ message.id }}</p>
          <p><strong>Sujet :</strong> {{ message.sujet || "Aucun sujet" }}</p>
          <p><strong>Texte :</strong> {{ message.texte }}</p>
          <p><strong>Lu :</strong> {{ message.lu ? "Oui" : "Non" }}</p>
          <button @click="updateMessageStatus(message.id)" class="btn btn-success btn-sm">Mettre à jour</button>
        </li>
      </ul>
    </div>
  </div>

  <!-- Mettre à jour un message -->
  <div class="max-w-sm card shadow-md bg-base-300">
    <div class="card-body items-center">
      <h2 class="card-title">Mettre à jour un message</h2>
      <input v-model="messageUpdateContent" placeholder="Nouveau contenu" class="input input-bordered">
      <button @click="updateMessage" class="btn btn-warning">Mettre à jour</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      messageContent: '',
      studentId: '',
      subject: '',
      messages: [], // Liste des messages
      selectedMessageId: '',
      messageUpdateContent: '',
      errorMessage: ''
    };
  },
  methods: {
    validateFields() {
      if (!this.studentId || !this.subject || !this.messageContent) {
        this.errorMessage = 'Tous les champs (ID étudiant, sujet, et contenu du message) doivent être remplis.';
        return false;
      }
      this.errorMessage = '';
      return true;
    },

    async sendMessage() {
      if (!this.validateFields()) return;

      const messageData = {
        texte: this.messageContent,
        sujet: this.subject,
        etudiantId: this.studentId
      };

      try {
        const response = await fetch('http://localhost:8085/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(messageData)
        });

        if (response.ok) {
          alert('Message envoyé avec succès');
          this.messageContent = '';
          this.subject = ''; 
          this.studentId = ''; 
        } else {
          throw new Error('Erreur lors de l\'envoi du message');
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'envoi du message');
      }
    },

    async fetchMessages() {
      if (!this.studentId2) {
        alert('Veuillez entrer un ID d\'étudiant');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8085/api/messages/etudiants/${this.studentId2}`);

        if (response.ok) {
          const data = await response.json();
          this.messages = data;
        } else {
          throw new Error('Erreur lors de la récupération des messages');
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la récupération des messages');
      }
    },

    async updateMessageStatus(id) {
      try {
        const response = await fetch(`http://localhost:8085/api/messages/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          alert('Statut du message mis à jour avec succès');
        } else {
          throw new Error('Erreur lors de la mise à jour du statut du message');
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la mise à jour du statut du message');
      }
    },

    async updateMessage() {
      if (!this.messageUpdateContent || !this.selectedMessageId) {
        alert('Veuillez entrer un nouveau contenu et sélectionner un message');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8085/api/messages/${this.selectedMessageId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ texte: this.messageUpdateContent })
        });

        if (response.ok) {
          alert('Message mis à jour avec succès');
          this.messageUpdateContent = '';
          this.selectedMessageId = '';
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
</script>

