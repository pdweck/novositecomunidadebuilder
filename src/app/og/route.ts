import { ImageResponse } from 'next/og'

export const runtime = 'edge'

function toDataUrl(contentType: string, buffer: ArrayBuffer): string {
	const base64 = Buffer.from(buffer).toString('base64')
	return `data:${contentType};base64,${base64}`
}

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const headline = searchParams.get('headline') || 'Na dúvida, vai de frizante na lata'
	const subhead = searchParams.get('subhead') || 'Leve, refrescante e constante. Qualidade que você confia.'
	const imageUrl = searchParams.get('image') || ''

	let canSrc: string | undefined
	if (imageUrl) {
		try {
			const res = await fetch(imageUrl)
			const contentType = res.headers.get('content-type') || 'image/png'
			const arrayBuffer = await res.arrayBuffer()
			canSrc = toDataUrl(contentType, arrayBuffer)
		} catch {}
	}

	return new ImageResponse(
		(
			<div
				style={{
					width: '1080px',
					height: '1350px',
					display: 'flex',
					position: 'relative',
					background: 'linear-gradient(180deg, #ffffff 0%, #f6f7f9 100%)',
					fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto',
					color: '#111111',
				}}
			>
				{/* Ornaments */}
				<div
					style={{
						position: 'absolute',
						top: 200,
						right: 120,
						width: 440,
						height: 440,
						borderRadius: 9999,
						background: '#f0f3f7',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						bottom: 120,
						left: 120,
						width: 520,
						height: 520,
						borderRadius: 9999,
						background: '#eef2f6',
					}}
				/>

				{/* Can image */}
				<div
					style={{
						position: 'absolute',
						left: 120,
						top: 260,
						width: 420,
						height: 760,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						background: canSrc ? 'transparent' : '#ffffff',
						boxShadow: '0 12px 36px rgba(0,0,0,0.15)',
						borderRadius: 16,
					}}
				>
					{canSrc ? (
						<img src={canSrc} width={420} height={760} style={{ objectFit: 'contain' }} />
					) : (
						<div style={{ color: '#666', fontSize: 24, textAlign: 'center', padding: 24 }}>
							Adicione ?image=URL para incluir a lata
						</div>
					)}
				</div>

				{/* Chip */}
				<div
					style={{
						position: 'absolute',
						left: 120,
						top: 220,
						padding: '16px 22px',
						borderRadius: 16,
						background: '#f3ead7',
						border: '1px solid #e7d7b6',
						fontWeight: 700,
						fontSize: 28,
						color: '#735c2f',
					}}
				>
					Kosher Mevushal · 7% vol
				</div>

				{/* Headline */}
				<div style={{ position: 'absolute', left: 580, top: 480 }}>
					<div style={{ fontWeight: 800, fontSize: 92, lineHeight: 1.05, letterSpacing: -1 }}>
						{headline.split('\n').map((line, i) => (
							<div key={i}>{line}</div>
						))}
					</div>
					<div style={{ marginTop: 32, fontWeight: 500, fontSize: 38, lineHeight: 1.35, color: '#444' }}>
						{subhead}
					</div>
					{/* CTA */}
					<div
						style={{
							marginTop: 120,
							width: 360,
							height: 80,
							borderRadius: 14,
							background: '#111',
							color: '#fff',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontWeight: 700,
							fontSize: 34,
						}}
					>
						Experimente agora
					</div>
				</div>

				{/* Branding */}
				<div style={{ position: 'absolute', left: 120, bottom: 90, color: '#666', fontSize: 28 }}>
					18K Wine · Vinho Frisante em Lata
				</div>
			</div>
		),
		{ width: 1080, height: 1350 }
	)
}


