import React from 'react'

const featureHighlights = [
  {
    title: '軽量で高精度な PP-OCR シリーズ',
    description:
      'PaddleOCR のコアである PP-OCRv4 は、検出・方向分類・認識を組み合わせた軽量パイプラインで、高精度と高速性を両立します。量子化や蒸留を組み合わせ、クラウドからエッジデバイスまで柔軟に展開できます。',
  },
  {
    title: '80 以上の言語に対応',
    description:
      '中日英はもちろん、韓国語やドイツ語、アラビア語など 80 以上の言語モデルを提供。手書き、縦書き、長文といった多様なシナリオにも対応できるリッチなモデル群を公式が継続的に更新しています。',
  },
  {
    title: '産業シナリオ向けの PP-Structure',
    description:
      '表領域検出、セル構造抽出、キー情報抽出（KIE）、レイアウト解析など、文書理解タスクを一括でサポート。請求書や契約書といった複雑レイアウトの自動化に活用できます。',
  },
  {
    title: '豊富な導入形態',
    description:
      'Python SDK、コマンドライン、RESTful サービス、Paddle Lite / Serving / FastDeploy 等のエコシステムを網羅。Docker や Jetson など多彩なプラットフォームで運用できます。',
  },
]

const pipelineStages = [
  {
    stage: '1. Text Detection',
    detail:
      'Differentiable Binarization（DB）をベースにした検出モデルが、文書・シーン画像からテキスト領域を抽出します。PP-OCRv4 ではデータ増強とバックボーン改良でリコールが向上しました。',
  },
  {
    stage: '2. Direction Classification',
    detail:
      'Angle Classifier が文字の向きを推定し、90°/180° 回転を補正。縦書きや上下逆の画像でも安定して認識を行えます。',
  },
  {
    stage: '3. Text Recognition',
    detail:
      'SVTR・Vision Transformer 系列の認識モデルが、検出領域から文字列をデコード。語彙制限なしで多言語に対応し、PP-OCRv4 では小さなテキストでも読み取り精度が向上しています。',
  },
]

const quickStartSteps = [
  {
    title: '環境準備',
    command: 'pip install "paddlepaddle>=2.5" paddleocr',
    description: 'CUDA 環境を利用する場合は公式ドキュメントに従って PaddlePaddle をインストールします。CPU のみでも動作可能です。',
  },
  {
    title: '最初の推論',
    command: 'paddleocr --image_dir docs/images/12.jpg --use_angle_cls true --lang=ch',
    description: 'CLI から検出〜認識を一括で実行します。結果は画像と JSON で出力され、簡単に OCR パイプラインを体験できます。',
  },
  {
    title: 'Python API',
    command: `from paddleocr import PaddleOCR\nocr = PaddleOCR(use_angle_cls=True, lang="ch")\nresult = ocr.ocr("./demo.png")`,
    description: 'PaddleOCR クラスを使えば、NumPy 配列や画像パスから直接結果を取得し、可視化ユーティリティで描画まで行えます。',
  },
]

const modelZoo = [
  {
    name: 'PP-OCRv4 通用中文モデル',
    size: '推論 640×640 で ~3.5ms (Tesla T4)',
    note: '汎用文書向けの最新安定版。文字・表組・スキャン文書など広範なシーンで高精度。',
  },
  {
    name: 'PP-OCRv4 Server & Mobile',
    size: 'Server: ResNet/ViT 系列, Mobile: Lite-HGNet',
    note: 'エッジデバイス向けの軽量モデルと、クラウド向けの高精度モデルをラインナップ。用途に応じて選択可能。',
  },
  {
    name: 'PP-StructureV3',
    size: '表領域検出 + レイアウト解析 + KIE',
    note: '文書理解タスクを包括するソリューション。OCR と組み合わせて構造化データを生成します。',
  },
]

const ecosystem = [
  {
    title: 'FastDeploy',
    description: 'C++ / Python での高速推論フレームワーク。Paddle、ONNX、TensorRT など複数バックエンドをサポートし、PaddleOCR のモデルがワンクリックで最適化できます。',
    link: 'https://github.com/PaddlePaddle/FastDeploy',
  },
  {
    title: 'PaddleOCR JSON サービス',
    description: 'REST API を通じて OCR 結果を取得できる軽量サーバー。Docker イメージが提供され、他言語からの連携も容易です。',
    link: 'https://github.com/PaddlePaddle/PaddleOCR/tree/release/2.7/deploy/paddleocr-json',
  },
  {
    title: 'PaddleX / GUI ツール',
    description: 'ノーコードでモデルの学習・評価・導出をサポートする GUI。アノテーション、学習、推論をワークフロー形式で管理できます。',
    link: 'https://github.com/PaddlePaddle/PaddleX',
  },
]

const timeline = [
  { year: '2020', event: 'PaddleOCR 初版公開。DB + CRNN を中心に、簡単に使える OCR ツールとして注目される。' },
  { year: '2021', event: 'PP-OCRv2/v3 をリリースし、検出・認識モデルが大幅に高速化。多言語モデルも拡充。' },
  { year: '2022', event: 'PP-Structure や KIE、レイアウト解析など文書理解機能が進化。産業用途への導入事例が増加。' },
  { year: '2023', event: 'PP-ChatOCR / 文書 QA ソリューションを発表。OCR + LLM でエンドツーエンドの文書解析を支援。' },
  { year: '2024', event: 'PP-OCRv4 を中心に推論品質が向上。Whl パッケージと REST サービスが安定版として提供。' },
]

const languageTags = ['中文', 'English', '日本語', '한국어', 'Deutsch', 'Français', 'ภาษาไทย', 'العربية']

function Section({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <section className="section">
      <div className="section-header">
        <h2>{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-body">{children}</div>
    </div>
  )
}

function CodeBlock({ command }: { command: string }) {
  return (
    <pre className="code-block">
      <code>{command}</code>
    </pre>
  )
}

export default function App() {
  return (
    <div className="page">
      <header className="hero">
        <div>
          <span className="hero-badge">PaddleOCR ガイド</span>
          <h1>PaddleOCR を使った OCR アプリ構築のすべて</h1>
          <p>
            PaddleOCR の README_cn を参考に、機能概要からモデル選択、導入手順、エコシステムまでを一気に俯瞰できるナレッジアプリです。
            日本語チームが取り組む際のハイライトをまとめました。
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="https://github.com/PaddlePaddle/PaddleOCR" target="_blank" rel="noreferrer">
              GitHub リポジトリを見る
            </a>
            <a
              className="btn outline"
              href="https://github.com/PaddlePaddle/PaddleOCR/blob/main/readme/README_cn.md"
              target="_blank"
              rel="noreferrer"
            >
              README を読む
            </a>
          </div>
        </div>
        <div className="hero-card">
          <h3>対応言語</h3>
          <div className="tag-cloud">
            {languageTags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
            <span className="tag muted">and more...</span>
          </div>
          <p className="muted-text">最新のモデルは release ページで随時更新されています。</p>
        </div>
      </header>

      <Section title="PaddleOCR の特徴" subtitle="実践投入しやすいポイントを 4 つに凝縮しました。">
        <div className="grid">
          {featureHighlights.map((feature) => (
            <Card key={feature.title} title={feature.title}>
              <p>{feature.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="PP-OCR パイプライン" subtitle="検出・方向分類・認識の 3 ステージを連携させた構成です。">
        <div className="pipeline">
          {pipelineStages.map((stage) => (
            <div key={stage.stage} className="pipeline-item">
              <div className="pipeline-index">{stage.stage}</div>
              <p>{stage.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="クイックスタート">
        <div className="grid">
          {quickStartSteps.map((step) => (
            <Card key={step.title} title={step.title}>
              <p>{step.description}</p>
              <CodeBlock command={step.command} />
            </Card>
          ))}
        </div>
      </Section>

      <Section title="モデル選定ガイド" subtitle="用途に合わせてサーバー・モバイル・文書理解モデルを選びましょう。">
        <div className="grid">
          {modelZoo.map((model) => (
            <Card key={model.name} title={model.name}>
              <p className="meta">{model.size}</p>
              <p>{model.note}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="エコシステムとの連携">
        <div className="grid">
          {ecosystem.map((item) => (
            <div key={item.title} className="card link-card">
              <div className="card-body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href={item.link} target="_blank" rel="noreferrer" className="link">
                  リポジトリを見る →
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="進化の歩み">
        <div className="timeline">
          {timeline.map((item) => (
            <div key={item.year} className="timeline-item">
              <div className="timeline-year">{item.year}</div>
              <p>{item.event}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="次のステップ" subtitle="学習データの準備からデプロイまで、README の情報でロードマップを描けます。">
        <div className="cta-panel">
          <div>
            <h3>学習を始める</h3>
            <p>LabelMe などでアノテーションしたデータを準備し、PaddleOCR のトレーニングスクリプトで微調整しましょう。</p>
          </div>
          <div className="cta-actions">
            <a className="btn primary" href="https://github.com/PaddlePaddle/PaddleOCR/tree/release/2.7/doc/doc_ch" target="_blank" rel="noreferrer">
              ドキュメントを見る
            </a>
            <a className="btn outline" href="https://github.com/PaddlePaddle/PaddleOCR/issues" target="_blank" rel="noreferrer">
              コミュニティに質問する
            </a>
          </div>
        </div>
      </Section>

      <footer className="footer">
        <p>
          このアプリは PaddleOCR README_cn の内容をもとにまとめた学習用ダッシュボードです。最新情報は公式リポジトリをご確認ください。
        </p>
      </footer>
    </div>
  )
}
