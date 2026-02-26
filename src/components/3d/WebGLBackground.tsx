import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';

const ShaderGradientAny = ShaderGradient as any;

const WebGLBackground = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900"></div>
        <ShaderGradientCanvas
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
            }}
        >
            <ShaderGradientAny
                animate="on"
                axesHelper="off"
                bgColor1="#000000"
                bgColor2="#000000"
                brightness={1}
                cAzimuthAngle={180}
                cDistance={2.8}
                cPolarAngle={80}
                cameraZoom={9.1}
                color1="#606080"
                color2="#8d7dca"
                color3="#212121"
                destination="onCanvas"
                embedMode="off"
                envPreset="city"
                format="gif"
                fov={45}
                frameRate={10}
                gizmoHelper="hide"
                grain="on"
                lightType="3d"
                pixelDensity={1}
                positionX={0}
                positionY={0}
                positionZ={0}
                range="disabled"
                rangeEnd={40}
                rangeStart={0}
                reflection={0.1}
                rotationX={50}
                rotationY={0}
                rotationZ={-60}
                shader="defaults"
                type="waterPlane"
                uAmplitude={0}
                uDensity={1.5}
                uFrequency={0}
                uSpeed={0.3}
                uStrength={1.5}
                uTime={8}
                wireframe={false}
            />
        </ShaderGradientCanvas>
        <div className="absolute inset-0 bg-grain mix-blend-overlay pointer-events-none"></div>
    </div>
);

export default WebGLBackground;
