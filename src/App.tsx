import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';

interface Question {
  id: number;
  text: string;
  type: 'truth' | 'dare';
  spicy: boolean;
}

const questions: Question[] = [
  // Truths - Regular
  { id: 1, text: "Qual foi sua primeira impressão de mim?", type: "truth", spicy: false },
  { id: 2, text: "Qual é sua memória favorita juntos?", type: "truth", spicy: false },
  { id: 3, text: "O que você quer fazer comigo no futuro?", type: "truth", spicy: false },
  { id: 4, text: "Qual foi a coisa mais atenciosa que já fiz por você?", type: "truth", spicy: false },
  { id: 5, text: "Qual é sua característica física favorita em mim?", type: "truth", spicy: false },
  { id: 6, text: "Quem você gostaria de beijar agora?", type: "truth", spicy: true },
  { id: 7, text: "Já teve vontade de me chamar para algo ousado?", type: "truth", spicy: true },
  { id: 8, text: "Qual é seu maior segredo de sedução?", type: "truth", spicy: true },
  { id: 9, text: "Onde você gostaria de me beijar em segredo?", type: "truth", spicy: true },
  { id: 10, text: "O que você acha de uma noite sem roupas?", type: "truth", spicy: true },
  { id: 11, text: "Qual parte do corpo do parceiro você gostaria de explorar mais?", type: "truth", spicy: true },
  { id: 12, text: "Qual seria o lugar mais inusitado onde você gostaria de fazer amor?", type: "truth", spicy: true },
  { id: 13, text: "Qual é o seu fetiche secreto?", type: "truth", spicy: true },
  { id: 14, text: "Se eu sugerir algo, você faria?", type: "truth", spicy: true },
  { id: 15, text: "Você já me observou enquanto eu não percebia?", type: "truth", spicy: true },
  { id: 16, text: "Você já fantasiou comigo em um lugar público?", type: "truth", spicy: true },
  { id: 17, text: "Qual é sua ideia de uma noite perfeita a dois?", type: "truth", spicy: true },
  { id: 18, text: "Se você pudesse mudar uma coisa no nosso relacionamento íntimo, o que seria?", type: "truth", spicy: true },
  { id: 19, text: "Qual é o momento mais íntimo que você já sonhou para nós?", type: "truth", spicy: true },
  { id: 20, text: "O que você acha de um jogo sexy de exploração?", type: "truth", spicy: true },
  { id: 72, text: "Qual foi o momento mais divertido que passamos juntos?", type: "truth", spicy: false },
  { id: 73, text: "Se pudesse reviver um dia ao meu lado, qual seria?", type: "truth", spicy: false },
  { id: 74, text: "Qual é a primeira coisa que você nota em mim quando nos vemos?", type: "truth", spicy: false },
  { id: 75, text: "Qual foi a maior surpresa que você já recebeu de mim?", type: "truth", spicy: false },
  { id: 76, text: "Qual é a sua lembrança mais marcante comigo?", type: "truth", spicy: false },
  { id: 77, text: "Se nossa história virasse um filme, qual seria o título?", type: "truth", spicy: false },
  { id: 78, text: "O que mais te orgulha em mim?", type: "truth", spicy: false },
  { id: 79, text: "Se pudesse mudar algo que fiz, o que seria?", type: "truth", spicy: false },
  { id: 80, text: "Você já sonhou comigo? O que aconteceu no sonho?", type: "truth", spicy: false },
  { id: 81, text: "Qual é o meu maior talento, na sua opinião?", type: "truth", spicy: false },
  { id: 82, text: "Qual momento nosso você gostaria de eternizar?", type: "truth", spicy: false },
  { id: 83, text: "O que você aprendeu comigo desde que nos conhecemos?", type: "truth", spicy: false },
  { id: 84, text: "Qual seria o destino da viagem dos seus sonhos comigo?", type: "truth", spicy: false },
  { id: 85, text: "Você se lembra do que sentiu quando nos vimos pela primeira vez?", type: "truth", spicy: false },
  { id: 86, text: "Qual música descreve melhor nosso relacionamento?", type: "truth", spicy: false },


  // Dares - Regular
  { id: 21, text: "Faça uma massagem de 30 segundos no seu parceiro", type: "dare", spicy: false },
  { id: 22, text: "Faça sua melhor imitação do seu parceiro", type: "dare", spicy: false },
  { id: 23, text: "Dance lentamente com seu parceiro por um minuto", type: "dare", spicy: false },
  { id: 24, text: "Dê cinco elogios ao seu parceiro em 30 segundos", type: "dare", spicy: false },
  { id: 25, text: "Crie uma pose romântica juntos para uma foto", type: "dare", spicy: false },
  { id: 26, text: "Cante uma música romântica para o seu parceiro", type: "dare", spicy: false },
  { id: 27, text: "Faça um desenho rápido de seu parceiro", type: "dare", spicy: false },
  { id: 28, text: "Mande uma mensagem fofa para o parceiro agora", type: "dare", spicy: false },
  { id: 29, text: "Faça uma serenata com a música favorita de seu parceiro", type: "dare", spicy: false },
  { id: 30, text: "Abra um presente surpresa para o seu parceiro", type: "dare", spicy: false },
  { id: 31, text: "Recrie sua primeira foto juntos", type: "dare", spicy: false },
  { id: 32, text: "Tire uma foto engraçada juntos e poste nas redes sociais", type: "dare", spicy: false },
  { id: 33, text: "Imite o riso do seu parceiro por um minuto", type: "dare", spicy: false },
  { id: 34, text: "Imite um animal e faça o seu parceiro adivinhar qual é", type: "dare", spicy: false },
  { id: 35, text: "Ligue para a sua mãe e diga que ama muito ela", type: "dare", spicy: false },
  { id: 36, text: "Desafie seu parceiro a fazer algo engraçado", type: "dare", spicy: false },
  { id: 37, text: "Envie uma mensagem de bom dia ao seu parceiro de uma maneira criativa", type: "dare", spicy: false },
  { id: 38, text: "Fale algo engraçado para o seu parceiro e faça-o rir", type: "dare", spicy: false },
  { id: 39, text: "Mande uma foto sua fazendo uma cara engraçada", type: "dare", spicy: false },
  { id: 40, text: "Prepare uma bebida surpresa para o seu parceiro", type: "dare", spicy: false },

  // Truths - Spicy (+18)
  { id: 41, text: "Qual parte do meu corpo você mais gosta de tocar?", type: "truth", spicy: true },
  { id: 42, text: "Onde você gostaria de me tocar sem eu perceber?", type: "truth", spicy: true },
  { id: 43, text: "Qual é a coisa mais ousada que você já fez e gostaria de repetir?", type: "truth", spicy: true },
  { id: 44, text: "Você já me observou enquanto eu estava distraído?", type: "truth", spicy: true },
  { id: 45, text: "Qual é o seu maior desejo secreto em um momento íntimo?", type: "truth", spicy: true },
  { id: 46, text: "Onde seria o lugar mais sensual para fazermos amor agora?", type: "truth", spicy: true },
  { id: 47, text: "Você já imaginou nós dois em um lugar público fazendo algo ousado?", type: "truth", spicy: true },
  { id: 48, text: "O que você faria se eu sugerisse uma fantasia sexy agora?", type: "truth", spicy: true },
  { id: 49, text: "Já pensou em me deixar sem palavras com um beijo inesperado?", type: "truth", spicy: true },
  { id: 50, text: "Qual parte do meu corpo você gostaria de explorar durante a noite?", type: "truth", spicy: true },
  { id: 51, text: "Você se sentiria excitada se me visse dançando sensual?", type: "truth", spicy: true },
  { id: 52, text: "O que você acha de uma noite de brincadeiras e surpresas?", type: "truth", spicy: true },
  { id: 53, text: "O que mais te excita quando estamos juntos?", type: "truth", spicy: true },
  { id: 54, text: "Qual é o seu maior fetiche que você ainda não me contou?", type: "truth", spicy: true },
  { id: 55, text: "Qual parte do meu corpo te faz perder o controle?", type: "truth", spicy: true },
  { id: 87, text: "Já se imaginou trepando com os olhos vendados?", type: "truth", spicy: true },
  { id: 88, text: "Qual foi a posição mais ousada que você já tentou — e repetiria comigo?", type: "truth", spicy: true },
  { id: 89, text: "Você já pensou em trepar no banho?", type: "truth", spicy: true },
  { id: 90, text: "Qual objeto você usaria em uma noite selvagem comigo?", type: "truth", spicy: true },
  { id: 91, text: "Você já se tocou pensando em mim? Onde estava?", type: "truth", spicy: true },
  { id: 92, text: "Qual palavra proibida você gostaria de ouvir durante um momento íntimo?", type: "truth", spicy: true },
  { id: 93, text: "Se fôssemos para um motel agora, o que você faria primeiro?", type: "truth", spicy: true },
  { id: 94, text: "Já se imaginou trepando com força na parede?", type: "truth", spicy: true },
  { id: 95, text: "Qual fantasia envolve roupas — ou a falta delas — que você quer realizar comigo?", type: "truth", spicy: true },
  { id: 96, text: "Qual parte minha você acha mais provocante quando estou de costas?", type: "truth", spicy: true },
  { id: 97, text: "Você já teve um sonho molhado comigo? O que aconteceu nele?", type: "truth", spicy: true },
  { id: 98, text: "Você toparia trepar em um local público, sem ninguém perceber?", type: "truth", spicy: true },
  { id: 99, text: "Qual foi o pensamento mais safado que já teve comigo em um momento sério?", type: "truth", spicy: true },
  { id: 100, text: "Já pensou em gravar um momento íntimo nosso? O que faria na gravação?", type: "truth", spicy: true },
  { id: 101, text: "Se eu dissesse 'hoje sem limites', o que você faria?", type: "truth", spicy: true },


  // Dares - Spicy (+18)
  { id: 102, text: "Escreva uma carta de amor curta para seu parceiro", type: "dare", spicy: false },
  { id: 103, text: "Faça uma careta engraçada até o outro rir", type: "dare", spicy: false },
  { id: 104, text: "Fale uma qualidade sua e uma do parceiro", type: "dare", spicy: false },
  { id: 105, text: "Faça um vídeo dizendo por que ama seu parceiro", type: "dare", spicy: false },
  { id: 106, text: "Coloque a música do casal e dancem juntos", type: "dare", spicy: false },
  { id: 107, text: "Abrace o parceiro por 30 segundos sem soltar", type: "dare", spicy: false },
  { id: 108, text: "Escrevam juntos um plano para o fim de semana", type: "dare", spicy: false },
  { id: 109, text: "Façam um brinde com a bebida favorita", type: "dare", spicy: false },
  { id: 110, text: "Troquem um presente simbólico agora", type: "dare", spicy: false },
  { id: 111, text: "Repitam juntos o momento do primeiro beijo", type: "dare", spicy: false },
  { id: 112, text: "Imitem um casal famoso e tirem uma selfie", type: "dare", spicy: false },
  { id: 113, text: "Façam uma lista de 3 sonhos que querem realizar juntos", type: "dare", spicy: false },
  { id: 114, text: "Peguem um papel e desenhem um ao outro com os olhos fechados", type: "dare", spicy: false },
  { id: 115, text: "Façam uma declaração de amor olhando nos olhos", type: "dare", spicy: false },
  { id: 116, text: "Contem uma história engraçada que viveram juntos", type: "dare", spicy: false },

  { id: 56, text: "Beije o pescoço do seu parceiro de forma sensual", type: "dare", spicy: true },
  { id: 57, text: "Fale uma palavra sexy para o seu parceiro", type: "dare", spicy: true },
  { id: 58, text: "Dê um beijo longo e apaixonado no seu parceiro", type: "dare", spicy: true },
  { id: 59, text: "Diga algo sexy no ouvido do seu parceiro", type: "dare", spicy: true },
  { id: 60, text: "Tire uma peça de roupa do seu parceiro sem ele perceber", type: "dare", spicy: true },
  { id: 61, text: "Fique em uma pose sexy por um minuto", type: "dare", spicy: true },
  { id: 62, text: "Faça uma dança sensual para o seu parceiro", type: "dare", spicy: true },
  { id: 63, text: "Beije o seu parceiro de uma forma inesperada e selvagem", type: "dare", spicy: true },
  { id: 64, text: "Deixe o seu parceiro tocar uma parte do seu corpo que ele nunca tocou antes", type: "dare", spicy: true },
  { id: 65, text: "Sussurre algo excitante no ouvido do seu parceiro e veja sua reação", type: "dare", spicy: true },
  { id: 66, text: "Tire uma peça de roupa com uma dança provocante", type: "dare", spicy: true },
  { id: 67, text: "Dê um beijo intenso e prolongado no seu parceiro", type: "dare", spicy: true },
  { id: 68, text: "Fale algo que te excita enquanto beija o seu parceiro", type: "dare", spicy: true },
  { id: 69, text: "Tire a camisa do seu parceiro com os dentes", type: "dare", spicy: true },
  { id: 70, text: "Faça seu parceiro perder o controle com um beijo quente", type: "dare", spicy: true },
  { id: 71, text: "Explique uma fantasia secreta para o seu parceiro e veja a reação dele", type: "dare", spicy: true },
  { id: 117, text: "Passe a língua suavemente no lóbulo da orelha do parceiro", type: "dare", spicy: true },
{ id: 118, text: "Simule uma cena de filme adulto sem tirar a roupa", type: "dare", spicy: true },
{ id: 119, text: "Use sua voz mais provocante e diga ao parceiro o que quer fazer", type: "dare", spicy: true },
{ id: 120, text: "Dê um beijo onde o parceiro menos espera", type: "dare", spicy: true },
{ id: 121, text: "Sente-se no colo do parceiro e fale algo bem picante", type: "dare", spicy: true },
{ id: 122, text: "Simule um gemido baixinho no ouvido do parceiro", type: "dare", spicy: true },
{ id: 123, text: "Tire uma peça de roupa sua lentamente encarando o parceiro", type: "dare", spicy: true },
{ id: 124, text: "Lamba suavemente o pescoço do parceiro", type: "dare", spicy: true },
{ id: 125, text: "Sussurre uma frase erótica como se estivesse em um momento íntimo", type: "dare", spicy: true },
{ id: 126, text: "Simule uma sessão de penetração com movimentos suaves por 10 segundos", type: "dare", spicy: true },
{ id: 127, text: "Morda de leve o lábio inferior do parceiro", type: "dare", spicy: true },
{ id: 128, text: "Toque no parceiro de forma provocante sem usar as mãos", type: "dare", spicy: true },
{ id: 129, text: "Escolha um lugar do corpo do parceiro para beijar com os olhos vendados", type: "dare", spicy: true },
{ id: 130, text: "Simule o que faria se estivessem sozinhos em um quarto escuro agora", type: "dare", spicy: true },
{ id: 131, text: "Diga em voz baixa onde você gostaria que o parceiro te beijasse", type: "dare", spicy: true },
{ id: 132, text: "Ajoelhe-se entre as pernas do parceiro e encoste o rosto bem próximo da parte íntima (por cima da roupa) sem tocar... só provocando com o olhar", type: "dare", spicy: true },
{ id: 133, text: "Segure os pulsos do parceiro contra a cama/sofá e beije com intensidade o pescoço até ele(a) pedir mais", type: "dare", spicy: true },
{ id: 134, text: "Tire a roupa do parceiro lentamente com os dentes, enquanto mantém o contato visual", type: "dare", spicy: true },
{ id: 135, text: "Use seus dedos para estimular o parceiro entre as pernas (por cima da roupa) com movimentos circulares lentos", type: "dare", spicy: true },
{ id: 136, text: "Lamba lentamente o abdômen do parceiro, descendo até o início da genitalia, mas sem tocar nela", type: "dare", spicy: true },
{ id: 137, text: "Simule uma sessão de dominação: sente-se sobre o parceiro e diga o que ele(a) pode ou não fazer com você", type: "dare", spicy: true },
{ id: 138, text: "Deite de bruços, erga o quadril e peça para o parceiro te tocar como se estivesse te preparando para a foda", type: "dare", spicy: true },
{ id: 139, text: "Ponha o parceiro de pé contra a parede e simule uma transa intensa por trás (com roupas)", type: "dare", spicy: true },
{ id: 140, text: "Dê mordidas leves na parte interna da coxa do parceiro, cada vez mais perto da genitalia", type: "dare", spicy: true },
{ id: 141, text: "Pegue um objeto (como uma almofada ou gravata) e amarre os olhos ou mãos do parceiro — e explore livremente", type: "dare", spicy: true },
{ id: 142, text: "Coloque sua boca bem próxima da genitalia do parceiro (com ou sem roupa) e fique apenas respirando profundamente", type: "dare", spicy: true },
{ id: 143, text: "Beije o parceiro com tanta força e desejo que ele(a) sinta que não aguenta mais esperar", type: "dare", spicy: true },
{ id: 144, text: "Deixe o parceiro lamber seus dedos... depois coloque-os em uma parte sensível do seu corpo", type: "dare", spicy: true },
{ id: 145, text: "Sussurre bem no ouvido do parceiro cada passo que você vai fazer até trepar com ele(a)", type: "dare", spicy: true },
{ id: 146, text: "Pegue a mão do parceiro e guie até sua parte mais quente... e diga: 'aqui é onde você me faz perder o controle'", type: "dare", spicy: true },

];


function App() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [usedQuestions, setUsedQuestions] = useState<number[]>([]);
  const [spicyMode, setSpicyMode] = useState(false);
  const [selectedType, setSelectedType] = useState<'truth' | 'dare' | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Sound effects
  const [playClick] = useSound('/sounds/click.mp3');
  const [playSuccess] = useSound('/sounds/success.mp3');
  const [playSwitch] = useSound('/sounds/switch2.mp3');

  const getRandomQuestion = (type: 'truth' | 'dare') => {
    const availableQuestions = questions.filter(q =>
      !usedQuestions.includes(q.id) &&
      q.type === type &&
      q.spicy === spicyMode
    );

    if (availableQuestions.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    return availableQuestions[randomIndex];
  };

  const handleTypeSelection = (type: 'truth' | 'dare') => {
    playClick();
    setSelectedType(type);
    const question = getRandomQuestion(type);
    if (question) {
      setCurrentQuestion(question);
      setUsedQuestions([...usedQuestions, question.id]);
      setIsOpen(true);
    }
  };

  const handleComplete = () => {
    playSuccess();
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      setIsOpen(false);
      setSelectedType(null);
    }, 2000);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setSelectedType(null);
  };

  const resetGame = () => {
    playSwitch();
    setCurrentPlayer(1);
    setUsedQuestions([]);
    setCurrentQuestion(null);
    setIsOpen(false);
    setSelectedType(null);
  };

  const isPlayerOne = currentPlayer === 1;
  const playerName = isPlayerOne ? "Txio Mirolas" : "Lady Million";
  const bgColor = isPlayerOne
    ? "bg-gradient-to-br from-blue-400 via-blue-200 to-blue-400"
    : "bg-gradient-to-br from-red-400 via-red-200 to-red-400";
  const buttonColor = isPlayerOne
    ? "bg-blue-600 hover:bg-blue-700"
    : "bg-red-600 hover:bg-red-700";
  const textColor = isPlayerOne ? "text-blue-800" : "text-red-800";

  return (
    <div className={`min-h-screen ${bgColor} p-8 transition-colors duration-1000`}>
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className={`text-4xl font-bold text-center ${textColor} mb-8`}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Verdade ou Desafio
        </motion.h1>

        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <h2 className={`text-3xl font-semibold ${textColor} mb-2`}>
            Vez de {playerName}
          </h2>
          <div className="w-32 h-1 mx-auto rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500" />
        </motion.div>

        <motion.div
          className="flex justify-center mb-8"
          whileHover={{ scale: 1.05 }}
        >
          <label className="flex items-center space-x-2 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full cursor-pointer">
            <input
              type="checkbox"
              checked={spicyMode}
              onChange={(e) => {
                playSwitch();
                setSpicyMode(e.target.checked);
              }}
              className="form-checkbox h-5 w-5 text-pink-600"
            />
            <span className={`${textColor} font-medium text-lg`}>
              Modo Picante 🌶️
            </span>
          </label>
        </motion.div>

        <div className="flex justify-center gap-6 mb-8">
          <motion.button
            onClick={() => handleTypeSelection('truth')}
            disabled={!!selectedType}
            className={`${buttonColor} text-white px-10 py-5 rounded-xl shadow-lg transition text-xl font-bold transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Verdade
          </motion.button>
          <motion.button
            onClick={() => handleTypeSelection('dare')}
            disabled={!!selectedType}
            className={`${buttonColor} text-white px-10 py-5 rounded-xl shadow-lg transition text-xl font-bold transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Desafio
          </motion.button>
        </div>

        <motion.div
          className="flex justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <button
            onClick={resetGame}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-700 transition"
          >
            Reiniciar Jogo
          </button>
        </motion.div>

        <AnimatePresence>
          {showConfetti && (
            <motion.div
              className="fixed inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-yellow-500"
                  initial={{
                    top: "50%",
                    left: "50%",
                    scale: 0,
                  }}
                  animate={{
                    top: Math.random() * 100 + "%",
                    left: Math.random() * 100 + "%",
                    scale: [0, 1, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeOut",
                    times: [0, 0.2, 1],
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <Dialog open={isOpen} onClose={handleCloseDialog} className="fixed inset-0 z-10 overflow-y-auto">
          <div className="min-h-screen px-4 text-center flex items-center justify-center">
            {/* Overlay com pointer-events-none */}
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 pointer-events-none" />

            <motion.div
              className={`relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl ${currentPlayer === 1 ? 'border-blue-500' : 'border-red-500'} border-4`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Dialog.Title className={`text-2xl font-bold ${textColor} mb-4`}>
                {currentQuestion?.type === 'truth' ? '🤔 VERDADE' : '🎯 DESAFIO'}
              </Dialog.Title>
              <motion.div
                className="mt-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-xl text-gray-700">{currentQuestion?.text}</p>
              </motion.div>

              <motion.div className="mt-6 flex justify-center gap-4" whileHover={{ scale: 1.05 }}>
                <button onClick={handleComplete} className={`${buttonColor} text-white px-8 py-4 rounded-xl text-lg font-bold`}>
                  Completar ✨
                </button>
              </motion.div>
            </motion.div>
          </div>
        </Dialog>

      </motion.div>
    </div>
  );
}

export default App;