import { styles } from "./styles"
import MedicaoFormProps from "../../types/MedicaoFormProps"

import { useState } from "react"
import { getAuth } from "firebase/auth"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useTheme } from "../../hooks/ThemeProvider"

const MedicaoForm: React.FC<MedicaoFormProps> = ({ onMedicaoAdicionada, loading }) => {
    const [sistolica, setSistolica] = useState("")
    const [diastolica, setDiastolica] = useState("")
    const [pulso, setPulso] = useState("")
    const [isAddingMedicao, setIsAddingMedicao] = useState(false)
    const auth = getAuth()
    const user = auth.currentUser
    const { theme } = useTheme()

    const adicionarMedicao = async () => {
        if (sistolica.trim() !== "" && diastolica.trim() !== "" && pulso.trim() !== "") {
            const sistolicaValue = parseFloat(sistolica)
            const diastolicaValue = parseFloat(diastolica)

            if (!isNaN(sistolicaValue) && !isNaN(diastolicaValue)) {
                const novaMedicao = {
                    userId: user?.uid ?? "",
                    sistolica,
                    diastolica,
                    pulso,
                    horario: new Date().toISOString(),
                    data: new Date().toISOString(),
                }

                try {
                    setIsAddingMedicao(true)

                    const medicoesRef = collection(db, "medicoes")
                    const docRef = await addDoc(medicoesRef, novaMedicao)

                    if (
                        sistolicaValue >= 90 &&
                        sistolicaValue <= 120 &&
                        diastolicaValue >= 60 &&
                        diastolicaValue <= 80
                    ) {
                        alert("Pressão está boa!")
                    } else {
                        alert(
                            "Pressão fora da faixa considerada saudável. Consulte um médico."
                        )
                    }

                    onMedicaoAdicionada()
                    alert("Adicionado com sucesso!!")

                } catch (error) {
                    console.error("Erro ao adicionar medição:", error)
                    alert(
                        "Erro ao adicionar medição. Consulte o console para mais detalhes."
                    )
                } finally {
                    setIsAddingMedicao(false)
                }
            } else {
                alert(
                    "Valores inválidos. Certifique-se de inserir números válidos para pressão sistólica e diastólica."
                )
            }
        }
    }

    return (
        <>
            <Text style={[styles.label, { color: theme.COLORS.POST_TITLE }]}>Sistólica</Text>
            <TextInput
                style={[
                    styles.input,
                    { color: theme.COLORS.POST_CONTENT },
                ]}
                placeholder="Digite o valor sistólico"
                placeholderTextColor={theme.COLORS.TEXT} // Defina a cor do placeholder
                value={sistolica}
                onChangeText={(texto) => setSistolica(texto)}
                keyboardType="numeric"
            />

            <Text style={[styles.label, { color: theme.COLORS.POST_TITLE }]}>Diastólica</Text>
            <TextInput
                style={[
                    styles.input,
                    { color: theme.COLORS.POST_CONTENT },
                ]}
                placeholder="Digite o valor diastólico"
                placeholderTextColor={theme.COLORS.TEXT} // Defina a cor do placeholder
                value={diastolica}
                onChangeText={(texto) => setDiastolica(texto)}
                keyboardType="numeric"
            />

            <Text style={[styles.label, { color: theme.COLORS.POST_TITLE }]}>Pulso</Text>
            <TextInput
                style={[
                    styles.input,
                    { color: theme.COLORS.POST_CONTENT },
                ]}
                placeholder="Digite o valor do pulso"
                placeholderTextColor={theme.COLORS.TEXT} // Defina a cor do placeholder
                value={pulso}
                onChangeText={(texto) => setPulso(texto)}
                keyboardType="numeric"
            />

            <TouchableOpacity
                style={[styles.botaoAdicionar, { backgroundColor: theme.COLORS.BUTTON }]}
                onPress={adicionarMedicao}
                disabled={loading || isAddingMedicao}>
                {isAddingMedicao ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color={theme.COLORS.WHITE} />
                    </View>
                ) : (
                    <Text style={[styles.textoBotao, { color: theme.COLORS.BUTTON_TEXT }]}>Registrar Medição</Text>
                )}
            </TouchableOpacity>
        </>
    )
}

export default MedicaoForm
