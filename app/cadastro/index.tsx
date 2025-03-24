import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useCliente } from 'src/contexts/ClienteContext';


export default function CadastroScreen() {
  const { salvarCliente, cliente, logout } = useCliente();
  const router = useRouter();

  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [editando, setEditando] = useState(false);
  const [modoLogin, setModoLogin] = useState(false);
  const emModoEdicao = cliente && editando;


  const handleCadastrar = () => {
    if (!nome || !email || !telefone || !endereco) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    salvarCliente({ nome, email, senha, telefone, endereco });
    Alert.alert('Cadastro realizado com sucesso!');
    router.push('/cadastro');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro do Cliente</Text>
  
      {cliente && !editando ? (
        <>
          <View style={styles.info}>
            <Text>✅ Cliente cadastrado com sucesso!</Text>
            <Text>👤 Nome: {cliente.nome}</Text>
            <Text>📧 Email: {cliente.email}</Text>
            <Text>📞 Telefone: {cliente.telefone}</Text>
            <Text>📍 Endereço: {cliente.endereco}</Text>
          </View>
  
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity
              onPress={() => {
                setEditando(true);
                setNome(cliente.nome);
                setEmail(cliente.email);
                setTelefone(cliente.telefone);
                setEndereco(cliente.endereco);
                setSenha(cliente.senha);
              }}
              style={[styles.botao, { flex: 1, backgroundColor: '#f0ad4e' }]}
            >
              <Text style={[styles.textoBotao, { color: '#000' }]}>Editar</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              onPress={logout}
              style={[styles.botao, { flex: 1, backgroundColor: '#ccc' }]}
            >
              <Text style={[styles.textoBotao, { color: '#000' }]}>Sair</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.subtitulo}>
            {modoLogin ? 'Digite seu e-mail e senha para entrar' : 'Preencha seus dados para se cadastrar'}
          </Text>
  
          {!modoLogin && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Nome completo"
                value={nome}
                onChangeText={setNome}
              />
              <TextInput
                style={styles.input}
                placeholder="Telefone"
                keyboardType="phone-pad"
                value={telefone}
                onChangeText={setTelefone}
              />
              <TextInput
                style={styles.input}
                placeholder="Endereço de entrega"
                value={endereco}
                onChangeText={setEndereco}
              />
            </>
          )}
  
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
  
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
  
          <TouchableOpacity
            style={styles.botao}
            onPress={() => {
              if (modoLogin) {
                if (!email || !senha) {
                  Alert.alert('Erro', 'Digite e-mail e senha para entrar.');
                  return;
                }
  
                if (cliente && cliente.email === email && cliente.senha === senha) {
                  Alert.alert('Login realizado com sucesso!');
                } else {
                  Alert.alert('Erro', 'E-mail ou senha inválidos.');
                }
                return;
              }
  
              // Cadastro ou edição
              if (!nome || !email || !telefone || !endereco || !senha) {
                Alert.alert('Erro', 'Preencha todos os campos');
                return;
              }
  
              salvarCliente({ nome, email, telefone, endereco, senha });
  
              if (emModoEdicao) {
                setEditando(false);
                Alert.alert('Alterações salvas com sucesso!');
              } else {
                setModoLogin(false);
                Alert.alert('Cadastro realizado com sucesso!');
              }
            }}
          >
            <Text style={styles.textoBotao}>
              {emModoEdicao ? 'Salvar Alterações' : modoLogin ? 'Entrar' : 'Cadastrar'}
            </Text>
          </TouchableOpacity>
  
          {!cliente && !editando && (
            <TouchableOpacity
              onPress={() => setModoLogin(!modoLogin)}
              style={[styles.botao, { backgroundColor: '#ccc', marginTop: 8 }]}
            >
              <Text style={[styles.textoBotao, { color: '#000' }]}>
                {modoLogin ? 'Voltar para cadastro' : 'Já tem cadastro? Fazer login'}
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );  
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 16 },
  botao: { backgroundColor: '#007aff', padding: 14, borderRadius: 8, alignItems: 'center' },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  info: {
    backgroundColor: '#f4f4f4',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },  
  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  
});
