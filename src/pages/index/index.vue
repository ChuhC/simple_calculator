<template>
	<view class="calculator">
		<view class="display-container">
			<input v-model="display" readonly />
			<view class="history">
				<view v-for="(item, index) in history" :key="index" class="history-item">
					{{ item }}
				</view>
			</view>
		</view>
		<view class="buttons">
			<view v-for="(row, rowIndex) in buttonRows" :key="rowIndex" class="button-row">
				<button 
					v-for="btn in row" 
					:key="btn" 
					@click="handleClick(btn)"
					:class="{ 'double-width': btn === '=' }"
				>
					{{ btn }}
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				display: '',
				history: [],
				buttonRows: [
					['(', ')', 'C', '/'],
					['7', '8', '9', '*'],
					['4', '5', '6', '-'],
					['1', '2', '3', '+'],
					['0', '.', '='] // 保持这个顺序不变
				],
				lastOperationWasEqual: false
			}
		},
		methods: {
			handleClick(value) {
				if (value === 'C') {
					this.clear()
				} else if (value === '=') {
					this.calculate()
				} else {
					this.appendValue(value)
				}
			},
			clear() {
				this.display = ''
				this.lastOperationWasEqual = false
			},
			appendValue(value) {
				if (this.lastOperationWasEqual) {
					this.display = ''
					this.lastOperationWasEqual = false
				}
				this.display += value
			},
			calculate() {
				try {
					const result = eval(this.display)
					const calculation = `${this.display} = ${result}`
					this.history.unshift(calculation)
					if (this.history.length > 20) {
						this.history.pop()
					}
					this.display = result.toString()
					this.lastOperationWasEqual = true
				} catch (error) {
					// 不将错误添加到历史记录中
					this.display = 'Error'
					this.lastOperationWasEqual = true
				}
			}
		}
	}
</script>

<style>
	.calculator {
		display: flex;
		flex-direction: column;
		height: 100vh;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		padding-top: 44px; /* 顶部间隔 */
		padding-bottom: 10px; /* 添加底部间隔 */
	}

	.display-container {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		padding-top: 20px; /* 为显示区域添加额外的顶部间隔 */
	}

	input {
		width: 100%;
		font-size: 32px;
		text-align: right;
		background-color: #333;
		color: white;
		border: none;
		padding: 5px;
		box-sizing: border-box;
	}

	.history {
		flex: 1;
		display: flex;
		flex-direction: column;
		text-align: right;
		font-size: 18px;
		color: #888;
		padding: 5px;
		background-color: #222;
		box-sizing: border-box;
		overflow-y: auto;
	}

	.history-item {
		margin-top: 5px;
	}

	.buttons {
		display: flex;
		flex-direction: column;
		background-color: #222;
		padding: 2px;
		box-sizing: border-box;
		margin-bottom: 10px; /* 为按钮区域添加底部间隔 */
	}

	.button-row {
		display: flex;
		height: 60px;
	}

	button {
		flex: 1;
		font-size: 28px;
		background-color: #FFA500;
		color: black;
		border: none;
		margin: 1px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.double-width {
		flex: 0 0 calc(50% - 2px) !important;
		width: calc(50% - 2px) !important;
	}

	/* 调整最后一行的布局 */
	.button-row:last-child {
		display: flex;
		justify-content: space-between;
	}

	.button-row:last-child button:not(.double-width) {
		flex: 0 0 calc(25% - 2px);
	}
</style>
