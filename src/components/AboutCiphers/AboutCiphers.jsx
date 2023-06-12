import { nanoid } from 'nanoid';
import style from './AboutCiphers.module.scss';

const ciphersInfo = [
  {
    id: nanoid(),
    name: 'AES (Advanced Encryption Standard)',
    description:
      'Симметричное блочное шифрование, широко применяемое для защиты данных.',
  },
  {
    id: nanoid(),
    name: 'DSA (Digital Signature Algorithm)',
    description:
      'Алгоритм цифровой подписи для проверки подлинности данных и обеспечения их целостности.',
  },
  {
    id: nanoid(),
    name: 'Шифр Виженера',
    description:
      'Полиалфавитный шифр, использующий ключевое слово для замены букв. Предоставляет высокий уровень безопасности.',
  },
  {
    id: nanoid(),
    name: 'Код Цезаря',
    description:
      'Простой шифр сдвига, заменяет каждую букву другой с фиксированным сдвигом. Именован в честь Цезаря, римского императора.',
  },
  {
    id: nanoid(),
    name: 'QR код',
    description:
      'Двухмерный штрих-код, содержащий различную информацию. Может быть отсканирован для доступа к закодированным данным.',
  },
  {
    id: nanoid(),
    name: 'Азбука Морзе',
    description:
      'Использует точки и тире для представления букв, цифр и знаков. Шифрует сообщения с помощью световых или звуковых сигналов.',
  },
];

const AboutCiphers = () => {
  return (
    <section className={style.root}>
      <h2 className={style.title}>О шифрах</h2>
      <div className={style.ciphers}>
        {ciphersInfo.map(({ id, name, description }) => (
          <div className={style.cipher} key={id}>
            <h3 className={style.name}>{name}</h3>
            <p className={style.description}>{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AboutCiphers;
