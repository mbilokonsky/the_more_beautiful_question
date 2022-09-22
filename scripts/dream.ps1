Set-Location stable-diffusion
Write-Output "Activating LDM"
conda activate ldm
$_executionPolicyFlag, $_executionPolicyValue, $_noScriptedFlag, $prompt = $args
Write-Output "Running script against prompt: $prompt"
python scripts/txt2img.py --prompt "$prompt" --plms --n_iter 4 --n_samples 2
conda deactivate
Set-Location .\